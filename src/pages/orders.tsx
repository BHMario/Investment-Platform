import Head from 'next/head'

export default function Orders() {
  return (
    <>
      <Head>
        <title>Orders | Investment Platform</title>
      </Head>
      <section className="space-y-6 py-10">
        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-semibold">Orders</h1>
          <p className="mt-2 text-slate-600">Revisa el historial de órdenes y estados de ejecución.</p>
        </div>
      </section>
    </>
  )
}
