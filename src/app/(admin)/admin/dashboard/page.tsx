import Link from 'next/link'
import {
  FileText,
  CalendarDays,
  FilePlus,
  CalendarPlus,
  Sparkles,
  Eye,
  PenLine,
  Clock,
  TrendingUp,
} from 'lucide-react'
import { formatDateShort } from '@/lib/utils'

/* ── Seed data (replace with DB queries) ── */

const stats = {
  totalArticles: 42,
  totalEvents: 87,
  drafts: 14,
  published: 98,
  scheduled: 6,
  inReview: 5,
}

const recentDrafts = [
  { id: '1', title: 'Best Rooftop Bars in South London', type: 'article', status: 'DRAFT', updatedAt: '2026-03-24T18:30:00Z' },
  { id: '2', title: 'Columbia Road Flower Market Guide', type: 'article', status: 'REVIEW', updatedAt: '2026-03-24T14:10:00Z' },
  { id: '3', title: 'Notting Hill Carnival 2026', type: 'event', status: 'DRAFT', updatedAt: '2026-03-23T09:45:00Z' },
  { id: '4', title: 'Hidden Speakeasies in Shoreditch', type: 'article', status: 'DRAFT', updatedAt: '2026-03-22T20:00:00Z' },
  { id: '5', title: 'Summer Screen at Somerset House', type: 'event', status: 'REVIEW', updatedAt: '2026-03-22T11:20:00Z' },
]

const aiQueue = [
  { id: '1', topic: 'Best Sunday Roasts in East London', status: 'READY' },
  { id: '2', topic: 'Free Museums for Kids', status: 'GENERATING' },
  { id: '3', topic: 'Peckham Food Scene Guide', status: 'PENDING' },
]

/* ── Components ── */

function StatCard({ label, value, icon: Icon, href }: { label: string; value: number; icon: React.ElementType; href?: string }) {
  const inner = (
    <div className="bg-white border border-ink-100 rounded-xl p-5 flex items-center gap-4 hover:border-ink-200 transition-colors">
      <div className="h-11 w-11 rounded-lg bg-ink-50 flex items-center justify-center shrink-0">
        <Icon className="h-5 w-5 text-ink-500" />
      </div>
      <div>
        <p className="text-2xl font-bold text-ink-900">{value}</p>
        <p className="text-sm text-ink-500">{label}</p>
      </div>
    </div>
  )
  return href ? <Link href={href}>{inner}</Link> : inner
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    DRAFT: 'bg-ink-100 text-ink-600',
    REVIEW: 'bg-amber-100 text-amber-700',
    SCHEDULED: 'bg-blue-100 text-blue-700',
    PUBLISHED: 'bg-emerald-100 text-emerald-700',
    PENDING: 'bg-ink-100 text-ink-600',
    GENERATING: 'bg-blue-100 text-blue-700',
    READY: 'bg-emerald-100 text-emerald-700',
  }
  return (
    <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full ${colors[status] || 'bg-ink-100 text-ink-600'}`}>
      {status}
    </span>
  )
}

/* ── Page ── */

export default function AdminDashboardPage() {
  return (
    <div className="max-w-6xl">
      {/* Breadcrumb */}
      <nav className="text-sm text-ink-400 mb-1">
        <Link href="/admin" className="hover:text-ink-600">Admin</Link>
      </nav>
      <h1 className="text-2xl font-display font-bold text-ink-900 mb-8">Dashboard</h1>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <StatCard label="Articles" value={stats.totalArticles} icon={FileText} href="/admin/articles" />
        <StatCard label="Events" value={stats.totalEvents} icon={CalendarDays} href="/admin/events" />
        <StatCard label="Drafts" value={stats.drafts} icon={PenLine} />
        <StatCard label="Published" value={stats.published} icon={Eye} />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent drafts */}
        <div className="lg:col-span-2">
          <h2 className="text-lg font-display font-semibold text-ink-900 mb-4">Recent Drafts</h2>
          <div className="bg-white border border-ink-100 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-ink-100 bg-ink-50/50">
                  <th className="text-left px-4 py-3 font-medium text-ink-500">Title</th>
                  <th className="text-left px-4 py-3 font-medium text-ink-500 hidden sm:table-cell">Type</th>
                  <th className="text-left px-4 py-3 font-medium text-ink-500">Status</th>
                  <th className="text-left px-4 py-3 font-medium text-ink-500 hidden md:table-cell">Updated</th>
                </tr>
              </thead>
              <tbody>
                {recentDrafts.map((draft) => (
                  <tr key={draft.id} className="border-b border-ink-50 last:border-0 hover:bg-ink-50/50 transition-colors">
                    <td className="px-4 py-3">
                      <Link
                        href={`/admin/${draft.type === 'article' ? 'articles' : 'events'}/${draft.id}`}
                        className="text-ink-900 font-medium hover:text-brand-600 transition-colors"
                      >
                        {draft.title}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-ink-500 capitalize hidden sm:table-cell">{draft.type}</td>
                    <td className="px-4 py-3"><StatusBadge status={draft.status} /></td>
                    <td className="px-4 py-3 text-ink-400 hidden md:table-cell">{formatDateShort(draft.updatedAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sidebar: Quick Actions + AI Queue */}
        <div className="space-y-8">
          {/* Quick actions */}
          <div>
            <h2 className="text-lg font-display font-semibold text-ink-900 mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <Link
                href="/admin/articles/new"
                className="flex items-center gap-3 bg-brand-600 text-white text-sm font-medium px-4 py-3 rounded-lg hover:bg-brand-700 transition-colors"
              >
                <FilePlus className="h-4 w-4" />
                New Article
              </Link>
              <Link
                href="/admin/events/new"
                className="flex items-center gap-3 bg-white border border-ink-200 text-ink-900 text-sm font-medium px-4 py-3 rounded-lg hover:bg-ink-50 transition-colors"
              >
                <CalendarPlus className="h-4 w-4" />
                New Event
              </Link>
              <Link
                href="/admin/ai-queue"
                className="flex items-center gap-3 bg-white border border-ink-200 text-ink-900 text-sm font-medium px-4 py-3 rounded-lg hover:bg-ink-50 transition-colors"
              >
                <Sparkles className="h-4 w-4" />
                AI Queue
              </Link>
            </div>
          </div>

          {/* AI Queue summary */}
          <div>
            <h2 className="text-lg font-display font-semibold text-ink-900 mb-4">AI Queue</h2>
            <div className="bg-white border border-ink-100 rounded-xl divide-y divide-ink-50">
              {aiQueue.map((item) => (
                <div key={item.id} className="px-4 py-3 flex items-center justify-between gap-3">
                  <span className="text-sm text-ink-700 truncate">{item.topic}</span>
                  <StatusBadge status={item.status} />
                </div>
              ))}
            </div>
            <Link href="/admin/ai-queue" className="inline-flex items-center gap-1 text-sm text-brand-600 hover:text-brand-700 mt-3 font-medium">
              View all <TrendingUp className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Quick stats */}
          <div>
            <h2 className="text-lg font-display font-semibold text-ink-900 mb-4">Pipeline</h2>
            <div className="bg-white border border-ink-100 rounded-xl divide-y divide-ink-50 text-sm">
              <div className="px-4 py-3 flex items-center justify-between">
                <span className="text-ink-500 flex items-center gap-2"><Clock className="h-4 w-4" /> Scheduled</span>
                <span className="font-semibold text-ink-900">{stats.scheduled}</span>
              </div>
              <div className="px-4 py-3 flex items-center justify-between">
                <span className="text-ink-500 flex items-center gap-2"><Eye className="h-4 w-4" /> In Review</span>
                <span className="font-semibold text-ink-900">{stats.inReview}</span>
              </div>
              <div className="px-4 py-3 flex items-center justify-between">
                <span className="text-ink-500 flex items-center gap-2"><PenLine className="h-4 w-4" /> Drafts</span>
                <span className="font-semibold text-ink-900">{stats.drafts}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
