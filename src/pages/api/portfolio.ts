import type { NextApiRequest, NextApiResponse } from 'next'
import db from '../../lib/mysql'
import { fallbackPortfolios } from '../../lib/demoData'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const [rows] = await db.query('SELECT id, name, value, performance, assets_count FROM portfolios LIMIT 20')
    const portfolios = Array.isArray(rows) ? rows : []
    res.status(200).json(portfolios)
  } catch (error) {
    console.error('Portfolio DB query failed, returning fallback data:', error)
    res.setHeader('x-data-source', 'demo')
    res.status(200).json(fallbackPortfolios)
  }
}
