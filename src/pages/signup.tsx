import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { signIn } from 'next-auth/react'

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const [loading, setLoading] = useState(false)
  const [nameError, setNameError] = useState<string | null>(null)
  const [emailError, setEmailError] = useState<string | null>(null)
  const [passwordError, setPasswordError] = useState<string | null>(null)
  const [passChecks, setPassChecks] = useState({ length: false, lower: false, upper: false, number: false, special: false })
  const [showPassword, setShowPassword] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setStatus(null)
    // Per-field validation
    let hasError = false
    if (!name.trim()) {
      setNameError('Enter your full name')
      hasError = true
    } else {
      setNameError(null)
    }

    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRe.test(String(email).toLowerCase())) {
      setEmailError('Enter a valid email address')
      hasError = true
    } else {
      setEmailError(null)
    }

    const checks = {
      length: password.length >= 8,
      lower: /[a-z]/.test(password),
      upper: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password),
    }
    setPassChecks(checks)
    const passValid = Object.values(checks).every(Boolean)
    if (!passValid) {
      setPasswordError('Password must meet all requirements')
      hasError = true
    } else {
      setPasswordError(null)
    }

    if (hasError) {
      setLoading(false)
      return
    }
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    })

    const result = await response.json()
    setLoading(false)
    if (response.ok) {
      // Auto sign-in after successful signup
      const signResult = await signIn('credentials', { redirect: false, email, password })
      if (!signResult || (signResult as any).error) {
        setStatus({ type: 'error', message: 'Account created but sign-in failed. Try signing in manually.' })
        return
      }

      setStatus({ type: 'success', message: result.message || 'Account created and signed in' })
      window.location.href = '/dashboard'
    } else {
      setStatus({ type: 'error', message: result.error || 'Unable to create account' })
    }
  }

  return (
    <>
      <Head>
        <title>Sign Up — NexVest</title>
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
                Start building your future.
              </h1>
              <p className="mt-6 max-w-xl text-base text-slate-300 sm:text-lg">
                Create an account to access real-time insights, portfolio tracking, and market analysis in one place.
              </p>
            </div>
          </section>

          <section className="flex items-center justify-center px-6 py-10 sm:px-10 lg:px-16">
            <div className="w-full max-w-md rounded-[34px] border border-slate-800/90 bg-slate-950/95 p-9 shadow-[0_30px_120px_-60px_rgba(56,189,248,0.28)] backdrop-blur-xl">
              <div className="mb-8">
                <h2 className="text-3xl font-semibold text-white">Create your account</h2>
                <p className="mt-2 text-sm text-slate-500">Start trading with NexVest and manage your portfolio in one place.</p>
              </div>

              {status && (
                <div className={`mb-5 rounded-2xl border px-4 py-3 text-sm ${status.type === 'success' ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-200' : 'border-red-500/40 bg-red-500/10 text-red-200'}`}>
                  {status.message}
                </div>
              )}

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                    Full name
                  </label>
                  <div className="mt-3 rounded-2xl border border-slate-800 bg-slate-900/80 px-4 py-3 shadow-inner shadow-black/10">
                    <input
                      id="name"
                      type="text"
                      className="w-full bg-transparent text-white placeholder:text-slate-500 focus:outline-none"
                      placeholder="Jane Doe"
                      value={name}
                      onChange={(event) => {
                        setName(event.target.value)
                        if (event.target.value.trim()) setNameError(null)
                      }}
                      required
                    />
                  </div>
                  {nameError && <p className="mt-2 text-xs text-red-400">{nameError}</p>}
                </div>

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
                      onChange={(event) => {
                        setEmail(event.target.value)
                        const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                        if (emailRe.test(String(event.target.value).toLowerCase())) setEmailError(null)
                      }}
                      required
                    />
                  </div>
                  {emailError && <p className="mt-2 text-xs text-red-400">{emailError}</p>}
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
                        onChange={(event) => {
                          const v = event.target.value
                          setPassword(v)
                          const checks = {
                            length: v.length >= 8,
                            lower: /[a-z]/.test(v),
                            upper: /[A-Z]/.test(v),
                            number: /[0-9]/.test(v),
                            special: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(v),
                          }
                          setPassChecks(checks)
                          if (Object.values(checks).every(Boolean)) setPasswordError(null)
                        }}
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
                            // eye-off
                            <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18M10.58 10.58A3 3 0 0113.42 13.42" />
                          ) : (
                            // eye
                            <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z M12 15a3 3 0 100-6 3 3 0 000 6z" />
                          )}
                        </svg>
                      </button>
                    </div>
                  {passwordError && <p className="mt-2 text-xs text-red-400">{passwordError}</p>}

                  {/* Password strength meter */}
                  <div className="mt-3">
                    <div className="h-2 w-full rounded-full bg-slate-800">
                      <div
                        style={{ width: `${(Object.values(passChecks).filter(Boolean).length / 5) * 100}%` }}
                        className="h-2 rounded-full bg-emerald-400 transition-all"
                      />
                    </div>
                    <ul className="mt-2 grid grid-cols-1 gap-1 text-xs text-slate-400">
                      <li className={`${passChecks.length ? 'text-emerald-300' : 'text-slate-500'}`}>• At least 8 characters</li>
                      <li className={`${passChecks.upper ? 'text-emerald-300' : 'text-slate-500'}`}>• Uppercase letter</li>
                      <li className={`${passChecks.lower ? 'text-emerald-300' : 'text-slate-500'}`}>• Lowercase letter</li>
                      <li className={`${passChecks.number ? 'text-emerald-300' : 'text-slate-500'}`}>• Number</li>
                      <li className={`${passChecks.special ? 'text-emerald-300' : 'text-slate-500'}`}>• Special character</li>
                    </ul>
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-1 w-full rounded-3xl bg-gradient-to-r from-emerald-400 via-cyan-400 to-sky-400 px-6 py-3 text-base font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:brightness-110 disabled:opacity-60"
                  disabled={loading}
                >
                  {loading ? 'Creating account...' : 'Create account'}
                </button>
              </form>

              <div className="mt-6 text-center text-sm text-slate-500">Or continue with</div>
              <div className="mt-4">
                <button type="button" onClick={() => signIn('google', { callbackUrl: '/dashboard' })} className="inline-flex w-full items-center justify-center gap-2 rounded-3xl border border-slate-800/90 bg-slate-900/80 px-4 py-3 text-sm text-slate-200 transition hover:bg-slate-800">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500" /> Google
                </button>
              </div>

              <p className="mt-6 text-center text-sm text-slate-500">
                Already have an account? <Link href="/login" className="text-emerald-400 hover:text-emerald-300">Sign in</Link>
              </p>
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

(Signup as any).noLayout = true
