import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

type StatusState = { type: 'success' | 'error'; message: string } | null

export default function ResetPassword() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [status, setStatus] = useState<StatusState>(null)
  const [loading, setLoading] = useState(false)
  const [token, setToken] = useState('')

  useEffect(() => {
    if (typeof router.query.token === 'string') {
      setToken(router.query.token)
    }
  }, [router.query.token])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus(null)

    if (!token) {
      setStatus({ type: 'error', message: 'Reset token is missing. Please use the link from your email.' })
      return
    }

    if (password.length < 8) {
      setStatus({ type: 'error', message: 'Password must be at least 8 characters.' })
      return
    }

    if (password !== confirmPassword) {
      setStatus({ type: 'error', message: 'Passwords do not match.' })
      return
    }

    setLoading(true)

    const response = await fetch('/api/auth/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, password }),
    })
    const result = await response.json()
    setLoading(false)

    if (!response.ok) {
      setStatus({ type: 'error', message: result.error || 'Unable to reset password right now.' })
      return
    }

    setStatus({ type: 'success', message: result.message || 'Your password has been updated successfully.' })
    setPassword('')
    setConfirmPassword('')
  }

  return (
    <>
      <Head>
        <title>Reset Password — NexVest</title>
      </Head>

      <div className="min-h-screen bg-[#040c19] text-white">
        <div className="mx-auto grid min-h-screen max-w-[1500px] grid-cols-1 lg:grid-cols-[0.95fr_1.35fr] gap-8 px-4 py-10 sm:px-6 lg:px-10">
          <section className="flex items-center justify-center px-6 py-10 sm:px-10 lg:px-16">
            <div className="w-full max-w-md rounded-[34px] border border-slate-800/90 bg-slate-950/95 p-9 shadow-[0_30px_120px_-60px_rgba(56,189,248,0.28)] backdrop-blur-xl">
              <div className="mb-8">
                <h2 className="text-3xl font-semibold text-white">Reset your password</h2>
                <p className="mt-2 text-sm text-slate-500">Use the link from your email to set a new password for your NexVest account.</p>
              </div>

              {status && (
                <div className={`mb-5 rounded-2xl border px-4 py-3 text-sm ${status.type === 'success' ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-200' : 'border-red-500/40 bg-red-500/10 text-red-200'}`}>
                  {status.message}
                </div>
              )}

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                    New password
                  </label>
                  <div className="mt-3 rounded-2xl border border-slate-800 bg-slate-900/80 px-4 py-3 shadow-inner shadow-black/10">
                    <input
                      id="password"
                      type="password"
                      className="w-full bg-transparent text-white placeholder:text-slate-500 focus:outline-none"
                      placeholder="••••••••"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="confirm-password" className="block text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                    Confirm password
                  </label>
                  <div className="mt-3 rounded-2xl border border-slate-800 bg-slate-900/80 px-4 py-3 shadow-inner shadow-black/10">
                    <input
                      id="confirm-password"
                      type="password"
                      className="w-full bg-transparent text-white placeholder:text-slate-500 focus:outline-none"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(event) => setConfirmPassword(event.target.value)}
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="mt-1 w-full rounded-3xl bg-gradient-to-r from-emerald-400 via-cyan-400 to-sky-400 px-6 py-3 text-base font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:brightness-110 disabled:opacity-60" disabled={loading}>
                  {loading ? 'Resetting…' : 'Reset password'}
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-slate-500">
                Remembered your password? <Link href="/login" className="text-emerald-400 hover:text-emerald-300">Sign in</Link>
              </p>
            </div>
          </section>

          <section className="flex flex-col justify-center px-6 py-10 sm:px-10 lg:px-16">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-3 rounded-full border border-slate-700/75 bg-slate-900/70 px-4 py-2 text-sm text-slate-300 mb-10 backdrop-blur-sm">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                NexVest
              </div>
              <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-6xl">
                Secure your access.
              </h1>
              <p className="mt-6 max-w-xl text-base text-slate-300 sm:text-lg">
                Reset passwords safely with one-time links and strong authentication.
              </p>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
