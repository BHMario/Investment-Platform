import Head from 'next/head'
import Link from 'next/link'
import Button from '../components/ui/Button'

export default function Home() {
  return (
    <>
      <Head>
        <title>Investment Platform</title>
      </Head>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-primary-600">Investment Platform</p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
                Construye, gestiona y controla tus inversiones con claridad.
              </h1>
              <p className="mt-6 max-w-2xl text-slate-600">
                Una plataforma diseñada para ofrecer visibilidad completa de portafolios, operaciones y mercados, con un diseño intuitivo y preparado para escalar.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/dashboard">
                  <Button>Ir al dashboard</Button>
                </Link>
                <Link href="/market">
                  <Button variant="secondary">Explorar mercados</Button>
                </Link>
              </div>
            </div>

            <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
              <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Resumen</p>
                  <h2 className="mt-2 text-2xl font-semibold text-slate-900">Cartera inicial</h2>
                </div>
                <span className="rounded-full bg-primary-50 px-3 py-1 text-sm text-primary-700">Live</span>
              </div>
              <div className="grid gap-4">
                <div className="rounded-2xl bg-slate-50 p-5">
                  <p className="text-sm text-slate-500">Valor total</p>
                  <p className="mt-2 text-3xl font-semibold text-slate-900">$124,820</p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl bg-slate-50 p-5">
                    <p className="text-sm text-slate-500">Rendimiento 30d</p>
                    <p className="mt-2 text-lg font-semibold text-emerald-600">+6.2%</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-5">
                    <p className="text-sm text-slate-500">Activos</p>
                    <p className="mt-2 text-lg font-semibold text-slate-900">28</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
