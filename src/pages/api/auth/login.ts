import type { NextApiRequest, NextApiResponse } from 'next'
import db, { initializeDatabase } from '../../../lib/mysql'
import { normalizeEmail, verifyPassword, isValidEmail } from '../../../lib/auth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email, password } = req.body as { email?: string; password?: string }
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' })
  }

  const normalizedEmail = normalizeEmail(email)

  if (!isValidEmail(normalizedEmail)) {
    return res.status(400).json({ error: 'Invalid email address' })
  }

  try {
    await initializeDatabase()
    const [rows] = await db.query('SELECT id, password_hash FROM users WHERE email = ?', [normalizedEmail])
    const user = Array.isArray(rows) && rows.length ? (rows[0] as { id: number; password_hash: string }) : null

    if (!user || !user.password_hash || !verifyPassword(password, user.password_hash)) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    return res.status(200).json({ success: true, message: 'Logged in successfully' })
  } catch (error) {
    console.error('Login API error:', error)
    return res.status(500).json({ error: 'Unable to login right now' })
  }
}
