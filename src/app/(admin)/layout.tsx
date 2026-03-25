'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  FileText,
  CalendarDays,
  FolderTree,
  MapPin,
  Image,
  Sparkles,
  Menu,
  X,
  LogOut,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const sidebarNav = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Articles', href: '/admin/articles', icon: FileText },
  { name: 'Events', href: '/admin/events', icon: CalendarDays },
  { name: 'Categories', href: '/admin/categories', icon: FolderTree },
  { name: 'Areas', href: '/admin/areas', icon: MapPin },
  { name: 'Media', href: '/admin/media', icon: Image },
  { name: 'AI Queue', href: '/admin/ai-queue', icon: Sparkles },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const isActive = (href: string) => {
    if (href === '/admin/dashboard') return pathname === '/admin' || pathname === '/admin/dashboard'
    return pathname.startsWith(href)
  }

  return (
    <div className="flex h-screen bg-ink-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 bg-ink-950 text-white flex flex-col transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:z-auto',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between h-16 px-5 border-b border-ink-800">
          <Link href="/admin" className="flex items-center gap-1">
            <span className="font-display text-lg text-brand-600">London</span>
            <span className="font-display text-lg text-white">Todo</span>
          </Link>
          <button
            type="button"
            className="lg:hidden p-1.5 text-ink-400 hover:text-white transition-colors"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Admin badge */}
        <div className="px-5 py-3">
          <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-ink-500 bg-ink-900 px-2.5 py-1 rounded-full">
            Admin Panel
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto">
          {sidebarNav.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors',
                  active
                    ? 'bg-brand-600 text-white'
                    : 'text-ink-400 hover:text-white hover:bg-ink-800'
                )}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon className="h-4.5 w-4.5 shrink-0" />
                {item.name}
              </Link>
            )
          })}
        </nav>

        {/* Sidebar footer */}
        <div className="px-3 py-4 border-t border-ink-800">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-ink-500 rounded-lg transition-colors hover:text-white hover:bg-ink-800"
          >
            <LogOut className="h-4.5 w-4.5 shrink-0" />
            Back to Site
          </Link>
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="h-16 bg-white border-b border-ink-100 flex items-center px-4 lg:px-8 shrink-0">
          <button
            type="button"
            className="lg:hidden -ml-1 p-2 text-ink-500 hover:text-ink-900 transition-colors"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="ml-auto text-sm text-ink-500">
            {/* Placeholder for admin user info */}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
