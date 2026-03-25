'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Plus,
  Sparkles,
  Check,
  X,
  Pencil,
  ChevronDown,
  Eye,
  Loader2,
  Clock,
} from 'lucide-react'
import { cn, formatDateShort } from '@/lib/utils'

/* ── Types & Seed data ── */

type DraftStatus = 'PENDING' | 'GENERATING' | 'READY' | 'APPROVED' | 'REJECTED' | 'PUBLISHED'

interface AiDraft {
  id: string
  template: string
  topic: string
  status: DraftStatus
  output: string | null
  createdAt: string
  updatedAt: string
}

const templates = [
  'Neighbourhood Guide',
  'Best Of List',
  'Event Preview',
  'Restaurant Review',
  'Weekend Roundup',
  'Seasonal Guide',
]

const initialDrafts: AiDraft[] = [
  {
    id: '1',
    template: 'Best Of List',
    topic: 'Best Sunday Roasts in East London',
    status: 'READY',
    output: `# Best Sunday Roasts in East London\n\nEast London is home to some of the city's finest Sunday roasts, from traditional pub fare to inventive modern takes.\n\n## 1. The Marksman, Hackney\nA Michelin-starred pub that elevates the roast dinner to an art form. Their beef dripping roast potatoes are legendary.\n\n## 2. The Empress, Victoria Park\nOverlooking Victoria Park, The Empress serves generous portions with all the trimmings. Book early - it fills up fast.\n\n## 3. Barge East, Hackney Wick\nA converted Dutch barge serving roasts with a view of the canal. The setting alone makes it worth the trip.\n\n## 4. The Gun, Docklands\nA riverside gastropub with historic charm. Their slow-roasted pork belly is a highlight.\n\n## 5. Sager + Wilde, Bethnal Green\nWine bar by night, roast dinner destination by day. Excellent wine pairings with your Sunday lunch.`,
    createdAt: '2026-03-24T10:00:00Z',
    updatedAt: '2026-03-24T10:05:00Z',
  },
  {
    id: '2',
    template: 'Neighbourhood Guide',
    topic: 'Free Museums for Kids',
    status: 'GENERATING',
    output: null,
    createdAt: '2026-03-24T11:30:00Z',
    updatedAt: '2026-03-24T11:30:00Z',
  },
  {
    id: '3',
    template: 'Neighbourhood Guide',
    topic: 'Peckham Food Scene Guide',
    status: 'PENDING',
    output: null,
    createdAt: '2026-03-24T12:00:00Z',
    updatedAt: '2026-03-24T12:00:00Z',
  },
  {
    id: '4',
    template: 'Event Preview',
    topic: 'Summer in Southbank 2026',
    status: 'APPROVED',
    output: 'Summer on the South Bank returns with a packed programme of free events, outdoor cinema screenings, and pop-up food stalls...',
    createdAt: '2026-03-22T09:00:00Z',
    updatedAt: '2026-03-23T14:00:00Z',
  },
  {
    id: '5',
    template: 'Best Of List',
    topic: 'Worst Tourist Traps in London',
    status: 'REJECTED',
    output: 'A controversial take on places to avoid...',
    createdAt: '2026-03-20T16:00:00Z',
    updatedAt: '2026-03-21T09:00:00Z',
  },
]

/* ── Components ── */

function StatusBadge({ status }: { status: DraftStatus }) {
  const config: Record<DraftStatus, { bg: string; icon?: React.ReactNode }> = {
    PENDING: { bg: 'bg-ink-100 text-ink-600' },
    GENERATING: { bg: 'bg-blue-100 text-blue-700', icon: <Loader2 className="h-3 w-3 animate-spin" /> },
    READY: { bg: 'bg-emerald-100 text-emerald-700' },
    APPROVED: { bg: 'bg-emerald-100 text-emerald-700' },
    REJECTED: { bg: 'bg-red-100 text-red-700' },
    PUBLISHED: { bg: 'bg-brand-100 text-brand-700' },
  }
  const c = config[status]
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${c.bg}`}>
      {c.icon}
      {status}
    </span>
  )
}

/* ── Page ── */

export default function AiQueuePage() {
  const [drafts, setDrafts] = useState<AiDraft[]>(initialDrafts)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [showNewForm, setShowNewForm] = useState(false)
  const [newTemplate, setNewTemplate] = useState(templates[0])
  const [newTopic, setNewTopic] = useState('')
  const [filterStatus, setFilterStatus] = useState<DraftStatus | 'ALL'>('ALL')

  const selectedDraft = drafts.find((d) => d.id === selectedId)
  const filtered = drafts.filter((d) => filterStatus === 'ALL' || d.status === filterStatus)

  function handleGenerate() {
    if (!newTopic.trim()) {
      alert('Enter a topic first.')
      return
    }
    const newDraft: AiDraft = {
      id: `draft-${Date.now()}`,
      template: newTemplate,
      topic: newTopic,
      status: 'PENDING',
      output: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setDrafts((prev) => [newDraft, ...prev])
    console.log('Generate AI draft:', { template: newTemplate, topic: newTopic })
    alert('Draft queued for generation (mock). It will appear as PENDING.')
    setNewTopic('')
    setShowNewForm(false)
  }

  function handleApprove(id: string) {
    setDrafts((prev) => prev.map((d) => d.id === id ? { ...d, status: 'APPROVED' as DraftStatus } : d))
    console.log('Approve draft', id)
    alert('Draft approved (mock). It will be promoted to an article.')
  }

  function handleReject(id: string) {
    setDrafts((prev) => prev.map((d) => d.id === id ? { ...d, status: 'REJECTED' as DraftStatus } : d))
    console.log('Reject draft', id)
  }

  function handleEdit(id: string) {
    console.log('Edit draft', id)
    alert('Opening editor (mock). This would redirect to the article editor with the AI content pre-filled.')
  }

  return (
    <div className="max-w-6xl">
      {/* Breadcrumb */}
      <nav className="text-sm text-ink-400 mb-1">
        <Link href="/admin" className="hover:text-ink-600">Admin</Link>
        <span className="mx-1.5">/</span>
        <span className="text-ink-600">AI Queue</span>
      </nav>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-display font-bold text-ink-900">AI Content Queue</h1>
        <button
          type="button"
          onClick={() => setShowNewForm(!showNewForm)}
          className="inline-flex items-center gap-2 bg-brand-600 text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-brand-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Generate New
        </button>
      </div>

      {/* New draft form */}
      {showNewForm && (
        <div className="bg-white border border-ink-100 rounded-xl p-5 mb-6">
          <h2 className="text-sm font-semibold text-ink-900 mb-4">Generate AI Content</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-ink-500 mb-1">Template</label>
              <div className="relative">
                <select
                  value={newTemplate}
                  onChange={(e) => setNewTemplate(e.target.value)}
                  className="appearance-none w-full pl-3 pr-9 py-2 text-sm border border-ink-200 rounded-lg bg-white text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-600/20 focus:border-brand-600"
                >
                  {templates.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-ink-500 mb-1">Topic</label>
              <input
                type="text"
                value={newTopic}
                onChange={(e) => setNewTopic(e.target.value)}
                placeholder="e.g. Best brunch spots in Brixton"
                className="w-full px-3 py-2 text-sm border border-ink-200 rounded-lg bg-white text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-brand-600/20 focus:border-brand-600"
              />
            </div>
            <div className="flex items-end gap-2">
              <button
                type="button"
                onClick={handleGenerate}
                className="inline-flex items-center gap-2 px-4 py-2 bg-brand-600 text-white text-sm font-medium rounded-lg hover:bg-brand-700 transition-colors"
              >
                <Sparkles className="h-4 w-4" />
                Generate
              </button>
              <button
                type="button"
                onClick={() => setShowNewForm(false)}
                className="px-4 py-2 border border-ink-200 text-ink-600 text-sm font-medium rounded-lg hover:bg-ink-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filter */}
      <div className="flex gap-3 mb-5">
        <div className="relative">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as DraftStatus | 'ALL')}
            className="appearance-none pl-3 pr-9 py-2 text-sm border border-ink-200 rounded-lg bg-white text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-600/20 focus:border-brand-600"
          >
            <option value="ALL">All Statuses</option>
            <option value="PENDING">Pending</option>
            <option value="GENERATING">Generating</option>
            <option value="READY">Ready</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400 pointer-events-none" />
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Queue list */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-ink-100 rounded-xl overflow-hidden divide-y divide-ink-50">
            {filtered.length === 0 && (
              <div className="px-4 py-10 text-center text-ink-400 text-sm">No drafts found.</div>
            )}
            {filtered.map((draft) => (
              <button
                key={draft.id}
                type="button"
                onClick={() => setSelectedId(draft.id)}
                className={cn(
                  'w-full text-left px-4 py-4 hover:bg-ink-50/50 transition-colors',
                  selectedId === draft.id && 'bg-ink-50 border-l-2 border-l-brand-600'
                )}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <span className="text-sm font-medium text-ink-900 line-clamp-2">{draft.topic}</span>
                  <StatusBadge status={draft.status} />
                </div>
                <div className="flex items-center gap-3 text-xs text-ink-400">
                  <span>{draft.template}</span>
                  <span>{formatDateShort(draft.createdAt)}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Preview pane */}
        <div className="lg:col-span-3">
          {selectedDraft ? (
            <div className="bg-white border border-ink-100 rounded-xl overflow-hidden">
              {/* Preview header */}
              <div className="px-5 py-4 border-b border-ink-100 flex items-center justify-between">
                <div>
                  <h2 className="text-base font-semibold text-ink-900">{selectedDraft.topic}</h2>
                  <div className="flex items-center gap-3 text-xs text-ink-400 mt-1">
                    <span>{selectedDraft.template}</span>
                    <StatusBadge status={selectedDraft.status} />
                  </div>
                </div>
                {selectedDraft.status === 'READY' && (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleApprove(selectedDraft.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 text-white text-xs font-medium rounded-lg hover:bg-emerald-700 transition-colors"
                    >
                      <Check className="h-3.5 w-3.5" />
                      Approve
                    </button>
                    <button
                      type="button"
                      onClick={() => handleEdit(selectedDraft.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-ink-200 text-ink-700 text-xs font-medium rounded-lg hover:bg-ink-50 transition-colors"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleReject(selectedDraft.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-red-200 text-red-600 text-xs font-medium rounded-lg hover:bg-red-50 transition-colors"
                    >
                      <X className="h-3.5 w-3.5" />
                      Reject
                    </button>
                  </div>
                )}
              </div>

              {/* Preview body */}
              <div className="px-5 py-5">
                {selectedDraft.output ? (
                  <div className="prose prose-sm max-w-none text-ink-700 whitespace-pre-wrap">
                    {selectedDraft.output}
                  </div>
                ) : selectedDraft.status === 'GENERATING' ? (
                  <div className="flex flex-col items-center justify-center py-16 text-ink-400">
                    <Loader2 className="h-8 w-8 animate-spin mb-3" />
                    <p className="text-sm">Generating content...</p>
                    <p className="text-xs mt-1">This usually takes 15-30 seconds</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 text-ink-400">
                    <Clock className="h-8 w-8 mb-3" />
                    <p className="text-sm">Waiting in queue</p>
                    <p className="text-xs mt-1">This draft will be generated shortly</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white border border-ink-100 rounded-xl flex flex-col items-center justify-center py-20 text-ink-400">
              <Eye className="h-8 w-8 mb-3" />
              <p className="text-sm">Select a draft to preview</p>
            </div>
          )}
        </div>
      </div>

      <p className="text-xs text-ink-400 mt-3">{filtered.length} draft{filtered.length !== 1 ? 's' : ''}</p>
    </div>
  )
}
