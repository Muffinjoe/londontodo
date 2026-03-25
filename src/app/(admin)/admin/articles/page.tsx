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

type ArticleStatus = 'DRAFT' | 'REVIEW' | 'SCHEDULED' | 'PUBLISHED' | 'ARCHIVED'

interface SeedArticle {
  id: string
  title: string
  slug: string
  status: ArticleStatus
  category: string
  author: string
  publishedAt: string | null
  updatedAt: string
  featured: boolean
}

const seedArticles: SeedArticle[] = [
  { id: '1', title: 'Best Rooftop Bars in South London', slug: 'best-rooftop-bars-south-london', status: 'DRAFT', category: 'Food & Drink', author: 'Joe Murfin', publishedAt: null, updatedAt: '2026-03-24T18:30:00Z', featured: false },
  { id: '2', title: 'Columbia Road Flower Market Guide', slug: 'columbia-road-flower-market-guide', status: 'REVIEW', category: 'Markets', author: 'Joe Murfin', publishedAt: null, updatedAt: '2026-03-24T14:10:00Z', featured: false },
  { id: '3', title: 'Hidden Speakeasies in Shoreditch', slug: 'hidden-speakeasies-shoreditch', status: 'DRAFT', category: 'Nightlife', author: 'Joe Murfin', publishedAt: null, updatedAt: '2026-03-22T20:00:00Z', featured: false },
  { id: '4', title: 'The Ultimate Borough Market Guide', slug: 'ultimate-borough-market-guide', status: 'PUBLISHED', category: 'Food & Drink', author: 'Joe Murfin', publishedAt: '2026-03-20T09:00:00Z', updatedAt: '2026-03-20T09:00:00Z', featured: true },
  { id: '5', title: 'Free Things to Do in London This Weekend', slug: 'free-things-london-this-weekend', status: 'PUBLISHED', category: 'Things To Do', author: 'Joe Murfin', publishedAt: '2026-03-18T10:00:00Z', updatedAt: '2026-03-18T10:00:00Z', featured: true },
  { id: '6', title: '10 Best Brunch Spots in Hackney', slug: '10-best-brunch-spots-hackney', status: 'PUBLISHED', category: 'Food & Drink', author: 'Joe Murfin', publishedAt: '2026-03-15T08:00:00Z', updatedAt: '2026-03-15T08:00:00Z', featured: false },
  { id: '7', title: 'Peckham Food Scene Guide', slug: 'peckham-food-scene-guide', status: 'SCHEDULED', category: 'Food & Drink', author: 'AI', publishedAt: null, updatedAt: '2026-03-14T16:00:00Z', featured: false },
  { id: '8', title: "London's Best Sunday Roasts", slug: 'londons-best-sunday-roasts', status: 'ARCHIVED', category: 'Food & Drink', author: 'Joe Murfin', publishedAt: '2025-11-10T09:00:00Z', updatedAt: '2025-11-10T09:00:00Z', featured: false },
]

const statusOptions: (ArticleStatus | 'ALL')[] = ['ALL', 'DRAFT', 'REVIEW', 'SCHEDULED', 'PUBLISHED', 'ARCHIVED']

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

/* ── Page ── */

export default function ArticlesListPage() {
  const [filter, setFilter] = useState<ArticleStatus | 'ALL'>('ALL')
  const [search, setSearch] = useState('')

  const filtered = seedArticles.filter((a) => {
    if (filter !== 'ALL' && a.status !== filter) return false
    if (search && !a.title.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  function handleDelete(id: string) {
    if (confirm('Delete this article? This cannot be undone.')) {
      console.log('Delete article', id)
      alert('Article deleted (mock)')
    }
  }

  return (
    <div className="max-w-6xl">
      {/* Breadcrumb */}
      <nav className="text-sm text-ink-400 mb-1">
        <Link href="/admin" className="hover:text-ink-600">Admin</Link>
        <span className="mx-1.5">/</span>
        <span className="text-ink-600">Articles</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-display font-bold text-ink-900">Articles</h1>
        <Link
          href="/admin/articles/new"
          className="inline-flex items-center gap-2 bg-brand-600 text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-brand-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          New Article
        </Link>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
          <input
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-ink-200 rounded-lg bg-white text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-brand-600/20 focus:border-brand-600"
          />
        </div>

        {/* Status filter */}
        <div className="relative">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as ArticleStatus | 'ALL')}
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
                <th className="text-left px-4 py-3 font-medium text-ink-500">Status</th>
                <th className="text-left px-4 py-3 font-medium text-ink-500 hidden lg:table-cell">Author</th>
                <th className="text-left px-4 py-3 font-medium text-ink-500 hidden sm:table-cell">Date</th>
                <th className="text-right px-4 py-3 font-medium text-ink-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-ink-400">No articles found.</td>
                </tr>
              )}
              {filtered.map((article) => (
                <tr key={article.id} className="border-b border-ink-50 last:border-0 hover:bg-ink-50/50 transition-colors">
                  <td className="px-4 py-3">
                    <div>
                      <Link
                        href={`/admin/articles/${article.id}`}
                        className="text-ink-900 font-medium hover:text-brand-600 transition-colors"
                      >
                        {article.title}
                      </Link>
                      {article.featured && (
                        <span className="ml-2 text-[10px] font-bold uppercase text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">Featured</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-ink-500 hidden md:table-cell">{article.category}</td>
                  <td className="px-4 py-3"><StatusBadge status={article.status} /></td>
                  <td className="px-4 py-3 text-ink-500 hidden lg:table-cell">{article.author}</td>
                  <td className="px-4 py-3 text-ink-400 hidden sm:table-cell">
                    {formatDateShort(article.publishedAt || article.updatedAt)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/articles/${article.id}`}
                        className="p-1.5 text-ink-400 hover:text-brand-600 transition-colors rounded-md hover:bg-ink-50"
                        title="Edit"
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>
                      {article.status === 'PUBLISHED' && (
                        <Link
                          href={`/${article.slug}`}
                          target="_blank"
                          className="p-1.5 text-ink-400 hover:text-brand-600 transition-colors rounded-md hover:bg-ink-50"
                          title="View"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>
                      )}
                      <button
                        onClick={() => handleDelete(article.id)}
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

      <p className="text-xs text-ink-400 mt-3">{filtered.length} article{filtered.length !== 1 ? 's' : ''}</p>
    </div>
  )
}
