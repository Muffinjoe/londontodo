'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Plus,
  Search,
  Pencil,
  Eye,
  Trash2,
  ChevronDown,
} from 'lucide-react'
import { cn, formatDateShort } from '@/lib/utils'

/* ── Seed data ── */

type EventStatus = 'DRAFT' | 'REVIEW' | 'SCHEDULED' | 'PUBLISHED' | 'ARCHIVED'

interface SeedEvent {
  id: string
  title: string
  slug: string
  status: EventStatus
  category: string
  area: string
  startDate: string
  endDate: string | null
  priceType: string
  featured: boolean
  updatedAt: string
}

const seedEvents: SeedEvent[] = [
  { id: '1', title: 'Notting Hill Carnival 2026', slug: 'notting-hill-carnival-2026', status: 'DRAFT', category: 'Festivals', area: 'Notting Hill', startDate: '2026-08-30', endDate: '2026-08-31', priceType: 'FREE', featured: true, updatedAt: '2026-03-23T09:45:00Z' },
  { id: '2', title: 'Summer Screen at Somerset House', slug: 'summer-screen-somerset-house', status: 'REVIEW', category: 'Film', area: 'Covent Garden', startDate: '2026-08-08', endDate: '2026-08-18', priceType: 'PAID', featured: false, updatedAt: '2026-03-22T11:20:00Z' },
  { id: '3', title: 'Maltby Street Market', slug: 'maltby-street-market', status: 'PUBLISHED', category: 'Markets', area: 'South Bank', startDate: '2026-03-28', endDate: null, priceType: 'FREE', featured: true, updatedAt: '2026-03-20T08:00:00Z' },
  { id: '4', title: 'Kew Gardens Night Walk', slug: 'kew-gardens-night-walk', status: 'PUBLISHED', category: 'Outdoors', area: 'Richmond', startDate: '2026-04-05', endDate: '2026-04-20', priceType: 'PAID', featured: false, updatedAt: '2026-03-18T12:00:00Z' },
  { id: '5', title: 'Jazz at Ronnie Scotts', slug: 'jazz-ronnie-scotts', status: 'PUBLISHED', category: 'Music', area: 'Soho', startDate: '2026-03-29', endDate: null, priceType: 'PAID', featured: false, updatedAt: '2026-03-17T15:00:00Z' },
  { id: '6', title: 'Food Truck Fridays - Peckham', slug: 'food-truck-fridays-peckham', status: 'SCHEDULED', category: 'Food & Drink', area: 'Peckham', startDate: '2026-04-03', endDate: null, priceType: 'FREE', featured: false, updatedAt: '2026-03-15T10:00:00Z' },
  { id: '7', title: "New Year's Eve Fireworks 2025", slug: 'nye-fireworks-2025', status: 'ARCHIVED', category: 'Festivals', area: 'South Bank', startDate: '2025-12-31', endDate: null, priceType: 'PAID', featured: false, updatedAt: '2025-12-30T09:00:00Z' },
]

const statusOptions: (EventStatus | 'ALL')[] = ['ALL', 'DRAFT', 'REVIEW', 'SCHEDULED', 'PUBLISHED', 'ARCHIVED']

/* ── Components ── */

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    DRAFT: 'bg-ink-100 text-ink-600',
    REVIEW: 'bg-amber-100 text-amber-700',
    SCHEDULED: 'bg-blue-100 text-blue-700',
    PUBLISHED: 'bg-emerald-100 text-emerald-700',
    ARCHIVED: 'bg-ink-100 text-ink-400',
  }
  return (
    <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full ${colors[status] || 'bg-ink-100 text-ink-600'}`}>
      {status}
    </span>
  )
}

function PriceBadge({ priceType }: { priceType: string }) {
  if (priceType === 'FREE') return <span className="text-xs font-semibold text-emerald-600">Free</span>
  if (priceType === 'DONATION') return <span className="text-xs text-ink-500">Donation</span>
  return <span className="text-xs text-ink-500">Paid</span>
}

/* ── Page ── */

export default function EventsListPage() {
  const [filter, setFilter] = useState<EventStatus | 'ALL'>('ALL')
  const [search, setSearch] = useState('')

  const filtered = seedEvents.filter((e) => {
    if (filter !== 'ALL' && e.status !== filter) return false
    if (search && !e.title.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  function handleDelete(id: string) {
    if (confirm('Delete this event? This cannot be undone.')) {
      console.log('Delete event', id)
      alert('Event deleted (mock)')
    }
  }

  return (
    <div className="max-w-6xl">
      {/* Breadcrumb */}
      <nav className="text-sm text-ink-400 mb-1">
        <Link href="/admin" className="hover:text-ink-600">Admin</Link>
        <span className="mx-1.5">/</span>
        <span className="text-ink-600">Events</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-display font-bold text-ink-900">Events</h1>
        <Link
          href="/admin/events/new"
          className="inline-flex items-center gap-2 bg-brand-600 text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-brand-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          New Event
        </Link>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-ink-200 rounded-lg bg-white text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-brand-600/20 focus:border-brand-600"
          />
        </div>
        <div className="relative">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as EventStatus | 'ALL')}
            className="appearance-none pl-3 pr-9 py-2 text-sm border border-ink-200 rounded-lg bg-white text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-600/20 focus:border-brand-600"
          >
            {statusOptions.map((s) => (
              <option key={s} value={s}>{s === 'ALL' ? 'All Statuses' : s}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400 pointer-events-none" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-ink-100 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-ink-100 bg-ink-50/50">
                <th className="text-left px-4 py-3 font-medium text-ink-500">Title</th>
                <th className="text-left px-4 py-3 font-medium text-ink-500 hidden md:table-cell">Category</th>
                <th className="text-left px-4 py-3 font-medium text-ink-500 hidden lg:table-cell">Area</th>
                <th className="text-left px-4 py-3 font-medium text-ink-500">Status</th>
                <th className="text-left px-4 py-3 font-medium text-ink-500 hidden sm:table-cell">Date</th>
                <th className="text-left px-4 py-3 font-medium text-ink-500 hidden md:table-cell">Price</th>
                <th className="text-right px-4 py-3 font-medium text-ink-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-ink-400">No events found.</td>
                </tr>
              )}
              {filtered.map((event) => (
                <tr key={event.id} className="border-b border-ink-50 last:border-0 hover:bg-ink-50/50 transition-colors">
                  <td className="px-4 py-3">
                    <div>
                      <Link
                        href={`/admin/events/${event.id}`}
                        className="text-ink-900 font-medium hover:text-brand-600 transition-colors"
                      >
                        {event.title}
                      </Link>
                      {event.featured && (
                        <span className="ml-2 text-[10px] font-bold uppercase text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">Featured</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-ink-500 hidden md:table-cell">{event.category}</td>
                  <td className="px-4 py-3 text-ink-500 hidden lg:table-cell">{event.area}</td>
                  <td className="px-4 py-3"><StatusBadge status={event.status} /></td>
                  <td className="px-4 py-3 text-ink-400 hidden sm:table-cell">
                    {formatDateShort(event.startDate)}
                    {event.endDate && <span className="text-ink-300"> - {formatDateShort(event.endDate)}</span>}
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell"><PriceBadge priceType={event.priceType} /></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/events/${event.id}`}
                        className="p-1.5 text-ink-400 hover:text-brand-600 transition-colors rounded-md hover:bg-ink-50"
                        title="Edit"
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>
                      {event.status === 'PUBLISHED' && (
                        <Link
                          href={`/events/${event.slug}`}
                          target="_blank"
                          className="p-1.5 text-ink-400 hover:text-brand-600 transition-colors rounded-md hover:bg-ink-50"
                          title="View"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>
                      )}
                      <button
                        onClick={() => handleDelete(event.id)}
                        className="p-1.5 text-ink-400 hover:text-red-600 transition-colors rounded-md hover:bg-red-50"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-xs text-ink-400 mt-3">{filtered.length} event{filtered.length !== 1 ? 's' : ''}</p>
    </div>
  )
}
