import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import Layout from '../components/Layout'

export default function App({ Component, pageProps }: AppProps) {
  const noLayout = (Component as any).noLayout
  const content = <Component {...pageProps} />

  if (noLayout) {
    return <SessionProvider session={(pageProps as any).session}>{content}</SessionProvider>
  }

  return (
    <SessionProvider session={(pageProps as any).session}>
      <Layout>{content}</Layout>
    </SessionProvider>
  )
}
