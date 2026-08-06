import type { NextApiRequest, NextApiResponse } from 'next'
import db, { initializeDatabase } from '../../../lib/mysql'
import { hashPassword } from '../../../lib/auth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { token, password } = req.body as { token?: string; password?: string }
  if (!token || !password) {
    return res.status(400).json({ error: 'Token and new password are required' })
  }

  if (password.length < 8) {
    return res.status(400).json({ error: 'Password must be at least 8 characters' })
  }

  try {
    await initializeDatabase()
    const [rows] = await db.query(
      'SELECT pr.id, pr.user_id FROM password_resets pr WHERE pr.token = ? AND pr.used = 0 AND pr.expires_at > NOW()',
      [token]
    )
    const reset = Array.isArray(rows) && rows.length ? (rows[0] as { id: number; user_id: number }) : null

    if (!reset) {
      return res.status(400).json({ error: 'Invalid or expired reset token' })
    }

    const passwordHash = hashPassword(password)
    await db.query('UPDATE users SET password_hash = ? WHERE id = ?', [passwordHash, reset.user_id])
    await db.query('UPDATE password_resets SET used = 1 WHERE id = ?', [reset.id])

    return res.status(200).json({ success: true, message: 'Password has been reset successfully' })
  } catch (error) {
    console.error('Reset password API error:', error)
    return res.status(500).json({ error: 'Unable to reset password right now.' })
  }
}
