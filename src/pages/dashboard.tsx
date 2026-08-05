import Head from 'next/head'
import useSWR from 'swr'
import Table from '../components/ui/Table'

type PortfolioItem = {
  id: number
  name: string
  value: number
  performance: number
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
  return { data: payload as PortfolioItem[], source }
}

const safeNumber = (value: number | string) => {
  const num = typeof value === 'number' ? value : Number(value)
  return Number.isFinite(num) ? num : 0
}

export default function Dashboard() {
  const { data: response, error } = useSWR<ApiResponse<PortfolioItem[]> | undefined>('/api/portfolio', fetcher)
  const portfolios = response?.data ?? []
  const source = response?.source ?? 'live'
  const totalValue = portfolios.reduce((sum, item) => sum + safeNumber(item.value), 0)
  const averagePerformance = portfolios.length ? portfolios.reduce((sum, item) => sum + safeNumber(item.performance), 0) / portfolios.length : 0
  const portfolioCount = portfolios.length

  const isLoading = !error && !response
  const hasData = portfolios.length > 0
  const isDemo = source === 'demo'

  return (
    <>
      <Head>
        <title>Dashboard | Investment Platform</title>
      </Head>
      <section className="space-y-6 py-10">
        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="mt-2 text-slate-600">Vista general de portafolio, rendimiento y actividad reciente.</p>
        </div>

        {error && !hasData ? (
          <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-red-700">
            <h2 className="text-xl font-semibold">No se pueden mostrar los datos</h2>
            <p className="mt-2 text-sm">No ha sido posible cargar los portafolios desde la base de datos. Comprueba la conexión del servidor o la configuración de la base de datos.</p>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Valor total</p>
              <p className="mt-4 text-3xl font-semibold text-slate-900">{hasData ? `$${totalValue.toLocaleString()}` : '—'}</p>
            </div>
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Rendimiento promedio</p>
              <p className="mt-4 text-3xl font-semibold text-emerald-600">{hasData ? `${averagePerformance.toFixed(2)}%` : '—'}</p>
            </div>
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Portafolios</p>
              <p className="mt-4 text-3xl font-semibold text-slate-900">{hasData ? portfolioCount : '—'}</p>
            </div>
          </div>
        )}

        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold">Carteras</h2>
              <p className="mt-1 text-sm text-slate-500">Resumen de portafolios y métricas clave.</p>
            </div>
            {error && <span className="text-sm text-red-600">{(error as Error).message || 'Error cargando portafolios.'}</span>}
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
                  { key: 'value', label: 'Valor', render: (row) => `$${safeNumber(row.value).toLocaleString()}` },
                  {
                    key: 'performance',
                    label: 'Rendimiento',
                    render: (row) => {
                      const value = safeNumber(row.performance)
                      return `${value.toFixed(2)}%`
                    },
                  },
                  { key: 'assets_count', label: 'Activos' },
                ]}
                data={portfolios}
              />
            </div>
          )}
        </div>
      </section>
    </>
  )
}
