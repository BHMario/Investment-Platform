import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import db, { initializeDatabase } from '../../../lib/mysql'
import { normalizeEmail, verifyPassword, isValidEmail } from '../../../lib/auth'

const providers = [
  CredentialsProvider({
    name: 'Credentials',
    credentials: {
      email: { label: 'Email', type: 'email', placeholder: 'hello@nexvest.io' },
      password: { label: 'Password', type: 'password' },
    },
    async authorize(credentials) {
      if (!credentials?.email || !credentials?.password) {
        throw new Error('Email and password are required')
      }

      if (!isValidEmail(credentials.email)) {
        throw new Error('Invalid email address')
      }

      const normalizedEmail = normalizeEmail(credentials.email)
      await initializeDatabase()
      const [rows] = await db.query('SELECT id, name, email, password_hash FROM users WHERE email = ?', [normalizedEmail])
      const user = Array.isArray(rows) && rows.length ? (rows[0] as { id: number; name: string; email: string; password_hash: string }) : null

      if (!user || !verifyPassword(credentials.password, user.password_hash)) {
        throw new Error('Invalid email or password')
      }

      return { id: user.id.toString(), name: user.name, email: user.email }
    },
  }),
]

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  )
}

export const authOptions = {
  providers,
  pages: {
    signIn: '/login',
    error: '/login',
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = (user as any).id
      }
      return token
    },
  },
  secret: process.env.NEXTAUTH_SECRET || process.env.NEXTAUTH_URL || 'default-secret',
}

export default NextAuth(authOptions)
