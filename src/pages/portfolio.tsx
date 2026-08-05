import Head from 'next/head'
import useSWR from 'swr'
import Table from '../components/ui/Table'

type PortfolioItem = {
  id: number
  name: string
  value: number | string
  performance: number | string
  assets_count: number
}

type ApiResponse<T> = {
  data: T
  source: 'live' | 'demo'
}

const fetcher = async (url: string): Promise<ApiResponse<PortfolioItem[]>> => {
  const res = await fetch(url)
  const payload = await res.json()

  if (!res.ok) {
    const message = payload?.error || res.statusText || 'Error fetching portfolio data'
    throw new Error(message)
  }

  const source = res.headers.get('x-data-source') === 'demo' ? 'demo' : 'live'
  return { data: (Array.isArray(payload) ? payload : []) as PortfolioItem[], source }
}

const formatCurrency = (value: number | string) => {
  const asNumber = typeof value === 'number' ? value : Number(value)
  return Number.isFinite(asNumber) ? `$${asNumber.toLocaleString()}` : '—'
}

const formatPercent = (value: number | string) => {
  const asNumber = typeof value === 'number' ? value : Number(value)
  return Number.isFinite(asNumber) ? `${asNumber.toFixed(2)}%` : '—'
}

export default function Portfolio() {
  const { data: response, error } = useSWR<ApiResponse<PortfolioItem[]> | undefined>('/api/portfolio', fetcher)
  const portfolios = response?.data ?? []
  const source = response?.source ?? 'live'
  const isLoading = !error && !response
  const hasData = portfolios.length > 0
  const isDemo = source === 'demo'

  return (
    <>
      <Head>
        <title>Portfolio | Investment Platform</title>
      </Head>
      <section className="space-y-6 py-10">
        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-semibold">Portfolio</h1>
          <p className="mt-2 text-slate-600">Gestiona tus carteras, posiciones y distribución de activos.</p>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold">Lista de portafolios</h2>
              <p className="mt-1 text-sm text-slate-500">Resumen de tus carteras y rendimiento.</p>
            </div>
            {error && <span className="text-sm text-red-600">{(error as Error).message || 'No se pudieron cargar los portafolios.'}</span>}
          </div>

          {isDemo && (
            <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-900">
              <p className="font-semibold">Modo demostración</p>
              <p className="mt-1 text-sm">Estás viendo datos de ejemplo porque la base de datos real no está disponible.</p>
            </div>
          )}

          {isLoading && (
            <div className="mt-6 rounded-2xl bg-slate-50 p-6 text-slate-600">Cargando portafolios desde la base de datos...</div>
          )}

          {hasData && (
            <div className="mt-6">
              <Table
                columns={[
                  { key: 'name', label: 'Portafolio' },
                  { key: 'value', label: 'Valor', render: (row) => formatCurrency(row.value) },
                  { key: 'performance', label: 'Rendimiento', render: (row) => formatPercent(row.performance) },
                  { key: 'assets_count', label: 'Activos' },
                ]}
                data={portfolios}
              />
            </div>
          )}

          {error && !hasData && (
            <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
              <p className="font-semibold">Error al cargar los portafolios</p>
              <p className="mt-2 text-sm text-red-700">No ha sido posible obtener información de la base de datos. Comprueba la conexión del servidor y vuelve a intentarlo.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
