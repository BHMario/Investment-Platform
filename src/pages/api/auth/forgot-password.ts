import type { NextApiRequest, NextApiResponse } from 'next'
import db, { initializeDatabase } from '../../../lib/mysql'
import { createPasswordResetToken, normalizeEmail, sendPasswordResetEmail } from '../../../lib/auth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email } = req.body as { email?: string }
  if (!email) {
    return res.status(400).json({ error: 'Email is required' })
  }

  try {
    await initializeDatabase()

    const normalizedEmail = normalizeEmail(email)
    const [rows] = await db.query('SELECT id FROM users WHERE email = ?', [normalizedEmail])
    const user = Array.isArray(rows) && rows.length ? (rows[0] as { id: number }) : null

    if (user) {
      const token = createPasswordResetToken()
      const expiresAt = new Date(Date.now() + 1000 * 60 * 60) // 1 hour
      await db.query('INSERT INTO password_resets (user_id, token, expires_at) VALUES (?, ?, ?)', [user.id, token, expiresAt])
      await sendPasswordResetEmail(normalizedEmail, token)
    }

    return res.status(200).json({ success: true, message: 'If your email exists, you will receive instructions to reset your password.' })
  } catch (error) {
    console.error('Forgot password API error:', error)
    return res.status(500).json({ error: 'Unable to process password reset request right now.' })
  }
}
