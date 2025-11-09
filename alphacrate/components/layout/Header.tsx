'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'

export function Header() {
  const { data: session, status } = useSession()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-red-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-xl">AC</span>
            </div>
            <span className="text-xl font-bold text-gray-900">AlphaCrate</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/products" className="text-gray-700 hover:text-red-600 font-medium transition">
              Products
            </Link>
            <Link href="/products?brand=ford" className="text-gray-700 hover:text-red-600 font-medium transition">
              Ford
            </Link>
            <Link href="/products?brand=mazda" className="text-gray-700 hover:text-red-600 font-medium transition">
              Mazda
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-red-600 font-medium transition">
              About
            </Link>
          </nav>

          {/* Right Side - Cart & Auth */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/cart" className="relative p-2 text-gray-700 hover:text-red-600 transition">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </Link>

            {status === 'loading' ? (
              <div className="h-10 w-20 bg-gray-200 animate-pulse rounded"></div>
            ) : session ? (
              <div className="flex items-center space-x-4">
                <Link href="/account" className="text-gray-700 hover:text-red-600 font-medium transition">
                  {session.user.name || 'Account'}
                </Link>
                {session.user.role === 'ADMIN' && (
                  <Link href="/admin" className="text-gray-700 hover:text-red-600 font-medium transition">
                    Admin
                  </Link>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => signOut({ callbackUrl: '/' })}
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/auth/login">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button size="sm">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <Link href="/products" className="text-gray-700 hover:text-red-600 font-medium">
                Products
              </Link>
              <Link href="/products?brand=ford" className="text-gray-700 hover:text-red-600 font-medium">
                Ford
              </Link>
              <Link href="/products?brand=mazda" className="text-gray-700 hover:text-red-600 font-medium">
                Mazda
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-red-600 font-medium">
                About
              </Link>
              <Link href="/cart" className="text-gray-700 hover:text-red-600 font-medium">
                Cart
              </Link>
              {session ? (
                <>
                  <Link href="/account" className="text-gray-700 hover:text-red-600 font-medium">
                    Account
                  </Link>
                  {session.user.role === 'ADMIN' && (
                    <Link href="/admin" className="text-gray-700 hover:text-red-600 font-medium">
                      Admin
                    </Link>
                  )}
                  <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="text-left text-gray-700 hover:text-red-600 font-medium"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link href="/auth/login" className="text-gray-700 hover:text-red-600 font-medium">
                    Sign In
                  </Link>
                  <Link href="/auth/register" className="text-gray-700 hover:text-red-600 font-medium">
                    Sign Up
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
