import type { NextApiRequest, NextApiResponse } from 'next'
import db, { initializeDatabase } from '../../lib/mysql'

type SummaryResponse = {
  sp500: { change_percent: number }
  btc: { price: number; change_percent: number }
  portfolioValue: number
}

const fallback: SummaryResponse = {
  sp500: { change_percent: 1.24 },
  btc: { price: 67420, change_percent: 3.2 },
  portfolioValue: 142000,
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<SummaryResponse>) {
  try {
    await initializeDatabase()
    const [marketRows] = await db.query(
      "SELECT ticker, price, change_percent FROM market_instruments WHERE ticker IN ('SPX', 'BTC')"
    )
    const [portfolioRows] = await db.query('SELECT SUM(value) AS total_value FROM portfolios')

    const markets = Array.isArray(marketRows) ? (marketRows as Array<{ ticker: string; price: number; change_percent: number }>) : []
    const portfolio = Array.isArray(portfolioRows) && portfolioRows[0] ? (portfolioRows[0] as { total_value?: number }) : undefined

    const sp500 = markets.find((item) => item.ticker === 'SPX')
    const btc = markets.find((item) => item.ticker === 'BTC')

    const response: SummaryResponse = {
      sp500: { change_percent: sp500?.change_percent ?? fallback.sp500.change_percent },
      btc: {
        price: btc?.price ?? fallback.btc.price,
        change_percent: btc?.change_percent ?? fallback.btc.change_percent,
      },
      portfolioValue: portfolio?.total_value ?? fallback.portfolioValue,
    }

    return res.status(200).json(response)
  } catch (error) {
    console.error('Login summary API failed, returning fallback values:', error)
    res.setHeader('x-data-source', 'demo')
    return res.status(200).json(fallback)
  }
}
