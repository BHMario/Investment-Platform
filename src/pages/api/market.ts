import type { NextApiRequest, NextApiResponse } from 'next'
import { getMarketInstruments } from '../../lib/marketApi'
import { fallbackMarketInstruments } from '../../lib/demoData'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const useLive = !!process.env.FINNHUB_API_KEY
    const rows = await getMarketInstruments(useLive)
    res.status(200).json(rows)
  } catch (error) {
    console.error('Market API failed, returning fallback data:', error)
    res.setHeader('x-data-source', 'demo')
    res.status(200).json(fallbackMarketInstruments)
  }
}
