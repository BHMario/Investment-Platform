import type { NextApiRequest, NextApiResponse } from 'next'
import db, { initializeDatabase } from '../../../lib/mysql'
import { hashPassword, normalizeEmail, isValidEmail, isStrongPassword } from '../../../lib/auth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, password } = req.body as { name?: string; email?: string; password?: string }
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email and password are required' })
  }

  if (password.length < 8) {
    return res.status(400).json({ error: 'Password must be at least 8 characters' })
  }

  const normalizedEmail = normalizeEmail(email)
  if (!isValidEmail(normalizedEmail)) {
    return res.status(400).json({ error: 'Invalid email address' })
  }

  if (!isStrongPassword(password)) {
    return res.status(400).json({ error: 'Password must be at least 8 characters and include uppercase, lowercase, number and special character' })
  }
  const passwordHash = hashPassword(password)

  try {
    await initializeDatabase()
    const [existing] = await db.query('SELECT id FROM users WHERE email = ?', [normalizedEmail])
    if (Array.isArray(existing) && existing.length) {
      return res.status(409).json({ error: 'User with this email already exists' })
    }

    await db.query('INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)', [name, normalizedEmail, passwordHash])
    return res.status(201).json({ success: true, message: 'Account created successfully' })
  } catch (error) {
    console.error('Signup API error:', error)
    return res.status(500).json({ error: 'Unable to create account right now' })
  }
}
