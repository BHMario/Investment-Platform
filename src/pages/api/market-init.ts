import type { NextApiRequest, NextApiResponse } from 'next'
import { initializeDatabase } from '../../lib/mysql'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await initializeDatabase()
    res.status(200).json({ message: 'Database initialized' })
  } catch (error) {
    console.error('Database initialization failed:', error)
    res.status(500).json({ error: 'Database initialization failed' })
  }
}
