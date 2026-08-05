import Head from 'next/head'
import useSWR from 'swr'
import Table from '../components/ui/Table'

type MarketItem = {
  ticker: string
  name: string
  price: number | string
  change_percent: number | string
  sector: string
}

type ApiResponse<T> = {
  data: T
  source: 'live' | 'demo'
}

const fetcher = async (url: string): Promise<ApiResponse<MarketItem[]>> => {
  const res = await fetch(url)
  const payload = await res.json()

  if (!res.ok) {
    const message = payload?.error || res.statusText || 'Error fetching market data'
    throw new Error(message)
  }

  const source = res.headers.get('x-data-source') === 'demo' ? 'demo' : 'live'
  return { data: payload as MarketItem[], source }
}

const formatValue = (value: number | string) => {
  const asNumber = typeof value === 'number' ? value : Number(value)
  return Number.isFinite(asNumber) ? `$${asNumber.toFixed(2)}` : '—'
}

export default function Market() {
  const { data: response, error } = useSWR<ApiResponse<MarketItem[]> | undefined>('/api/market', fetcher)
  const instruments = response?.data ?? []
  const source = response?.source ?? 'live'
  const isLoading = !error && !response
  const hasData = instruments.length > 0
  const isDemo = source === 'demo'

  return (
    <>
      <Head>
        <title>Market | Investment Platform</title>
      </Head>
      <section className="space-y-6 py-10">
        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-semibold">Market</h1>
          <p className="mt-2 text-slate-600">Explora instrumentos financieros y consulta datos clave.</p>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold">Instrumentos de mercado</h2>
              <p className="mt-1 text-sm text-slate-500">Precios e información actualizada para los principales activos.</p>
            </div>
            {error && <span className="text-sm text-red-600">{(error as Error).message || 'Error cargando datos de mercado.'}</span>}
          </div>

          {isLoading && (
            <div className="mt-6 rounded-2xl bg-slate-50 p-6 text-slate-600">Cargando datos de mercado desde la base de datos...</div>
          )}

          {isDemo && (
            <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-900">
              <p className="font-semibold">Modo demostración</p>
              <p className="mt-1 text-sm">Estás viendo datos de ejemplo porque la base de datos real no está disponible.</p>
            </div>
          )}

          {hasData && (
            <div className="mt-6">
              <Table
                columns={[
                  { key: 'ticker', label: 'Ticker' },
                  { key: 'name', label: 'Nombre' },
                  { key: 'price', label: 'Precio', render: (row) => formatValue(row.price) },
                  {
                    key: 'change_percent',
                    label: 'Cambio',
                    render: (row) => {
                      const asNumber = typeof row.change_percent === 'number' ? row.change_percent : Number(row.change_percent)
                      const isValid = Number.isFinite(asNumber)
                      return (
                        <span className={isValid && asNumber >= 0 ? 'text-emerald-600' : 'text-red-600'}>
                          {isValid ? `${asNumber.toFixed(2)}%` : '—'}
                        </span>
                      )
                    },
                  },
                  { key: 'sector', label: 'Sector' },
                ]}
                data={instruments}
              />
            </div>
          )}

          {error && !hasData && (
            <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
              <p className="font-semibold">Error al cargar datos de mercado</p>
              <p className="mt-2 text-sm text-red-700">No ha sido posible obtener datos de la base de datos. Comprueba la conexión del servidor y vuelve a intentarlo.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
