import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import useSWR from 'swr'
import { signIn } from 'next-auth/react'

type SummaryResponse = {
  sp500: { change_percent: number }
  btc: { price: number; change_percent: number }
  portfolioValue: number
}

type MessageState = { type: 'success' | 'error'; text: string }

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const Login: React.FC = () => {
  const router = useRouter()
  const { data } = useSWR<SummaryResponse>('/api/login-summary', fetcher)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [forgotEmail, setForgotEmail] = useState('')
  const [mode, setMode] = useState<'signin' | 'forgot'>('signin')
  const [message, setMessage] = useState<MessageState | null>(null)
  const [loading, setLoading] = useState(false)

  const stats = [
    {
      label: 'S&P 500',
      value: data ? `${data.sp500.change_percent >= 0 ? '+' : ''}${data.sp500.change_percent.toFixed(2)}%` : '…',
      note: 'Market momentum',
    },
    {
      label: 'BTC',
      value: data ? `$${data.btc.price.toLocaleString()} ${data.btc.change_percent >= 0 ? '+' : ''}${data.btc.change_percent.toFixed(2)}%` : '…',
      note: 'Crypto pulse',
    },
    {
      label: 'Portfolio',
      value: data ? `$${data.portfolioValue.toLocaleString()}` : '…',
      note: 'Total holdings',
    },
  ]

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setMessage(null)

    // Client-side basic validation
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRe.test(String(email).toLowerCase())) {
      setLoading(false)
      setMessage({ type: 'error', text: 'Enter a valid email address.' })
      return
    }

    if (!password || password.length < 8) {
      setLoading(false)
      setMessage({ type: 'error', text: 'Password must be at least 8 characters.' })
      return
    }

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    })

    setLoading(false)

    if (result?.error) {
      setMessage({ type: 'error', text: result.error })
      return
    }

    router.push('/dashboard')
  }

  const handleForgotPassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setMessage(null)

    const response = await fetch('/api/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: forgotEmail }),
    })

    const payload = await response.json()
    setLoading(false)

    if (!response.ok) {
      setMessage({ type: 'error', text: payload.error || 'Unable to send password reset email' })
      return
    }

    setMessage({ type: 'success', text: payload.message || 'If your email exists, a reset link has been sent.' })
  }

  return (
    <>
      <Head>
        <title>Sign In — NexVest</title>
      </Head>

      <div className="relative min-h-screen overflow-hidden bg-[#040c19] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,_rgba(16,185,129,0.16),_transparent_22%),radial-gradient(circle_at_90%_20%,_rgba(56,189,248,0.12),_transparent_22%),linear-gradient(180deg,_#020614_0%,_#060e1b_100%)]" />
        <div className="relative z-10 mx-auto grid min-h-screen max-w-[1500px] grid-cols-1 gap-8 lg:grid-cols-[1.35fr_0.95fr] px-4 py-10 sm:px-6 lg:px-10">
          <section className="flex items-center px-6 py-10 sm:px-10 lg:px-16">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-3 rounded-full border border-slate-700/75 bg-slate-900/70 px-4 py-2 text-sm text-slate-300 mb-10 backdrop-blur-sm">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                NexVest
              </div>

              <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-6xl">
                Invest in <span className="text-emerald-400">everything.</span>
              </h1>
              <p className="mt-6 max-w-xl text-base text-slate-300 sm:text-lg">
                Stocks, crypto, ETFs and more — all in one platform.
              </p>

              <div className="mt-12 grid gap-4 sm:grid-cols-3">
                {stats.map((item) => (
                  <div key={item.label} className="rounded-3xl border border-slate-800/90 bg-slate-900/85 p-5 shadow-[0_30px_60px_-40px_rgba(0,0,0,0.6)]">
                    <p className="text-sm uppercase tracking-[0.25em] text-slate-500">{item.label}</p>
                    <p className="mt-3 text-2xl font-semibold text-white">{item.value}</p>
                    <p className="mt-2 text-xs uppercase tracking-[0.24em] text-slate-500">{item.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="flex items-center justify-center px-6 py-10 sm:px-10 lg:px-16">
            <div className="w-full max-w-md rounded-[34px] border border-slate-800/90 bg-slate-950/95 p-9 shadow-[0_30px_120px_-60px_rgba(56,189,248,0.28)] backdrop-blur-xl">
              <div className="mb-8">
                <h2 className="text-3xl font-semibold text-white">Welcome back</h2>
                <p className="mt-2 text-sm text-slate-500">
                  Don’t have an account? <Link href="/signup" className="text-emerald-400 hover:text-emerald-300">Create account</Link>
                </p>
              </div>

              {message && (
                <div className={`mb-5 rounded-2xl border px-4 py-3 text-sm ${message.type === 'success' ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-200' : 'border-red-500/40 bg-red-500/10 text-red-200'}`}>
                  {message.text}
                </div>
              )}

              {mode === 'signin' ? (
                <form className="space-y-5" onSubmit={handleSignIn}>
                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                      Email address
                    </label>
                    <div className="mt-3 rounded-2xl border border-slate-800 bg-slate-900/80 px-4 py-3 shadow-inner shadow-black/10">
                      <input
                        id="email"
                        type="email"
                        className="w-full bg-transparent text-white placeholder:text-slate-500 focus:outline-none"
                        placeholder="hello@nexvest.io"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                      Password
                    </label>
                    <div className="mt-3 rounded-2xl border border-slate-800 bg-slate-900/80 px-3 py-2 shadow-inner shadow-black/10 flex items-center gap-3">
                      <input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        className="flex-1 bg-transparent text-white placeholder:text-slate-500 focus:outline-none"
                        placeholder="••••••••"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                      />

                      <button
                        type="button"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                        onClick={() => setShowPassword((s) => !s)}
                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900/60 text-slate-300 hover:bg-slate-800 transition"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          className={`h-5 w-5 transform transition-transform duration-200 ${showPassword ? 'rotate-180' : ''}`}
                        >
                          {showPassword ? (
                            <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18M10.58 10.58A3 3 0 0113.42 13.42" />
                          ) : (
                            <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z M12 15a3 3 0 100-6 3 3 0 000 6z" />
                          )}
                        </svg>
                      </button>
                    </div>
                  </div>

                  <button type="submit" className="mt-1 w-full rounded-3xl bg-gradient-to-r from-emerald-400 via-cyan-400 to-sky-400 px-6 py-3 text-base font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:brightness-110 disabled:opacity-60" disabled={loading}>
                    {loading ? 'Signing in…' : 'Sign In'}
                  </button>

                  <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
                    <button type="button" onClick={() => setMode('forgot')} className="text-emerald-400 hover:text-emerald-300">
                      Forgot password?
                    </button>
                    <Link href="/signup" className="text-emerald-400 hover:text-emerald-300">
                      Sign up
                    </Link>
                  </div>
                </form>
              ) : (
                <form className="space-y-5" onSubmit={handleForgotPassword}>
                  <div>
                    <label htmlFor="forgot-email" className="block text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                      Email address
                    </label>
                    <div className="mt-3 rounded-2xl border border-slate-800 bg-slate-900/80 px-4 py-3 shadow-inner shadow-black/10">
                      <input
                        id="forgot-email"
                        type="email"
                        className="w-full bg-transparent text-white placeholder:text-slate-500 focus:outline-none"
                        placeholder="hello@nexvest.io"
                        value={forgotEmail}
                        onChange={(event) => setForgotEmail(event.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <button type="submit" className="mt-1 w-full rounded-3xl bg-gradient-to-r from-sky-500 via-cyan-400 to-emerald-400 px-6 py-3 text-base font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:brightness-110 disabled:opacity-60" disabled={loading}>
                    {loading ? 'Sending…' : 'Send reset link'}
                  </button>

                  <div className="mt-4 text-center text-sm text-slate-500">
                    <button type="button" className="text-emerald-400 hover:text-emerald-300" onClick={() => setMode('signin')}>
                      Back to sign in
                    </button>
                  </div>
                </form>
              )}

              <div className="mt-6 text-center text-sm text-slate-500">Or continue with</div>
              <div className="mt-4">
                <button type="button" onClick={() => signIn('google', { callbackUrl: '/dashboard' })} className="inline-flex w-full items-center justify-center gap-2 rounded-3xl border border-slate-800/90 bg-slate-900/80 px-4 py-3 text-sm text-slate-200 transition hover:bg-slate-800">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500" /> Google
                </button>
              </div>

              <p className="mt-6 text-center text-sm text-slate-500">
                By continuing you agree to NexVest's <Link href="/terms" className="text-emerald-400 hover:text-emerald-300">Terms of Service</Link> and <Link href="/privacy" className="text-emerald-400 hover:text-emerald-300">Privacy Policy</Link>.
              </p>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

(Login as any).noLayout = true

export default Login
