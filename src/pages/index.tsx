import Head from 'next/head'
import Layout from '../components/Layout'

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Investment Platform</title>
      </Head>
      <main className="container mx-auto p-6">
        <h1 className="text-3xl font-semibold">Investment Platform</h1>
        <p className="mt-4 text-muted">Scaffold inicial con Next.js + TypeScript + Tailwind</p>
      </main>
    </Layout>
  )
}
