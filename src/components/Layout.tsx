import React from 'react'
import Header from './Header'

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <main className="container mx-auto p-6">{children}</main>
      <footer className="border-t mt-8 bg-white">
        <div className="container mx-auto p-4 text-sm text-center">© {new Date().getFullYear()} Investment Platform</div>
      </footer>
    </div>
  )
}

export default Layout
