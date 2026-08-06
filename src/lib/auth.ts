import crypto from 'crypto'
import nodemailer from 'nodemailer'

export const HASH_KEY_LENGTH = 64

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase()
}

export function hashPassword(password: string) {
  const salt = crypto.randomBytes(16).toString('hex')
  const derived = crypto.scryptSync(password, salt, HASH_KEY_LENGTH).toString('hex')
  return `${salt}:${derived}`
}

export function verifyPassword(password: string, storedHash: string) {
  const [salt, hash] = storedHash.split(':')
  if (!salt || !hash) {
    return false
  }

  const derived = crypto.scryptSync(password, salt, HASH_KEY_LENGTH).toString('hex')
  return crypto.timingSafeEqual(Buffer.from(derived, 'hex'), Buffer.from(hash, 'hex'))
}

export function createPasswordResetToken() {
  return crypto.randomBytes(32).toString('hex')
}

export function isValidEmail(email: string) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(String(email).toLowerCase())
}

export function isStrongPassword(password: string) {
  // At least 8 chars, one uppercase, one lowercase, one number, one special char
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/
  return re.test(password)
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  const resetUrl = `${baseUrl}/reset-password?token=${encodeURIComponent(token)}`
  const subject = 'NexVest password reset request'
  const text = `Hi,

We received a request to reset your NexVest password. Use the link below to choose a new password:

${resetUrl}

If you did not request a password reset, you can safely ignore this email.

Thanks,
NexVest Team`
  const html = `<p>Hi,</p><p>We received a request to reset your NexVest password. Use the link below to choose a new password:</p><p><a href="${resetUrl}">${resetUrl}</a></p><p>If you did not request a password reset, you can safely ignore this email.</p><p>Thanks,<br/>NexVest Team</p>`

  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASSWORD && process.env.EMAIL_FROM) {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_PORT === '465',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    })

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject,
      text,
      html,
    })

    return { sent: true, resetUrl }
  }

  console.info('Password reset email content (development fallback):', {
    email,
    resetUrl,
  })

  return { sent: false, resetUrl }
}
