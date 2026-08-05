import db from './mysql'

type MarketInstrument = {
  ticker: string
  name: string
  price: number
  change_percent: number
  sector: string
}

const MARKET_QUERY = 'SELECT ticker, name, price, change_percent, sector FROM market_instruments LIMIT 50'

async function fetchLiveQuote(ticker: string) {
  const token = process.env.FINNHUB_API_KEY
  if (!token) return null

  const url = `https://finnhub.io/api/v1/quote?symbol=${encodeURIComponent(ticker)}&token=${token}`
  const response = await fetch(url)
  if (!response.ok) return null

  const data = await response.json()
  if (typeof data.c !== 'number' || typeof data.dp !== 'number') return null

  return {
    price: data.c,
    change_percent: data.dp,
  }
}

export async function getMarketInstruments(useLive: boolean) {
  const [rows] = await db.query(MARKET_QUERY)
  const instruments = Array.isArray(rows) ? (rows as MarketInstrument[]) : []

  if (!useLive) {
    return instruments
  }

  const enriched = await Promise.all(
    instruments.map(async (instrument) => {
      const quote = await fetchLiveQuote(instrument.ticker)
      return quote ? { ...instrument, price: quote.price, change_percent: quote.change_percent } : instrument
    })
  )

  return enriched
}
