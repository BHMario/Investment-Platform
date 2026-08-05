import React, { useState } from 'react'
import Link from 'next/link'
import Avatar from './ui/Avatar'
import Button from './ui/Button'

const NavItem: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <Link href={href} className="px-3 py-2 rounded-md hover:bg-slate-100">
    {children}
  </Link>
)

const Header: React.FC = () => {
  const [open, setOpen] = useState(false)
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-xl font-semibold">
            Investment
          </Link>
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            <NavItem href="/market">Market</NavItem>
            <NavItem href="/portfolio">Portfolio</NavItem>
            <NavItem href="/orders">Orders</NavItem>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <Button variant="ghost">Connect</Button>
          </div>
          <Avatar name="Mario" />
          <button className="md:hidden p-2" aria-label="Open menu" onClick={() => setOpen(!open)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M4 6h16M4 12h16M4 18h16" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden bg-white border-t">
          <nav className="px-4 py-3 flex flex-col gap-1">
            <Link href="/market" className="px-3 py-2 rounded-md">Market</Link>
            <Link href="/portfolio" className="px-3 py-2 rounded-md">Portfolio</Link>
            <Link href="/orders" className="px-3 py-2 rounded-md">Orders</Link>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header
