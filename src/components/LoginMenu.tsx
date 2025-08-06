"use client";

import React from 'react'
import Link from 'next/link'
import { auth } from '../lib/firebase'
import { signOut } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'

const baseMenuClass =
  "inline-flex items-center px-3 py-2 rounded-md font-medium transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 text-sm h-10";
const activeClass =
  "bg-sidebar-accent text-sidebar-accent-foreground";
const inactiveClass =
  "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground";

const LoginMenu: React.FC<{ active?: boolean }> = ({ active = false }) => {
  const [user, loading] = useAuthState(auth)

  if (loading) {
    return <span className="text-gray-500">Loading...</span>
  }

  const className = `${baseMenuClass} ${active ? activeClass : inactiveClass}`;

  return user ? (
    <button
      onClick={() => signOut(auth)}
      className={className}
      type="button"
    >
      Logout
    </button>
  ) : (
    <Link href="/login" className={className}>
      Login
    </Link>
  )
}

export default LoginMenu
