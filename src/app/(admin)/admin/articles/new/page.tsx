'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { Save, Sparkles, Search, ChevronDown, Star, Megaphone } from 'lucide-react'
import { cn, slugify } from '@/lib/utils'

/* ── Seed options ── */

const categories = [
  { id: 'cat-1', name: 'Things To Do' },
  { id: 'cat-2', name: 'Food & Drink' },
  { id: 'cat-3', name: 'Markets' },
  { id: 'cat-4', name: 'Nightlife' },
  { id: 'cat-5', name: 'Arts & Culture' },
  { id: 'cat-6', name: 'Outdoors' },
  { id: 'cat-7', name: 'Family' },
  { id: 'cat-8', name: 'Shopping' },
]

const areas = [
  { id: 'area-1', name: 'Shoreditch' },
  { id: 'area-2', name: 'Soho' },
  { id: 'area-3', name: 'Camden' },
  { id: 'area-4', name: 'Hackney' },
  { id: 'area-5', name: 'Peckham' },
  { id: 'area-6', name: 'Brixton' },
  { id: 'area-7', name: 'Covent Garden' },
  { id: 'area-8', name: 'South Bank' },
  { id: 'area-9', name: 'Notting Hill' },
  { id: 'area-10', name: 'Greenwich' },
]

const statusOptions = ['DRAFT', 'REVIEW', 'SCHEDULED', 'PUBLISHED'] as const

/* ── Helpers ── */

function Label({ children, htmlFor, optional }: { children: React.ReactNode; htmlFor?: string; optional?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-ink-700 mb-1.5">
      {children}
      {optional && <span className="text-ink-400 font-normal ml-1">(optional)</span>}
    </label>
  )
}

function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        'w-full px-3 py-2 text-sm border border-ink-200 rounded-lg bg-white text-ink-900 placeholder:text-ink-400',
        'focus:outline-none focus:ring-2 focus:ring-brand-600/20 focus:border-brand-600',
        className
      )}
      {...props}
    />
  )
}

function Select({ className, children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative">
      <select
        className={cn(
          'appearance-none w-full pl-3 pr-9 py-2 text-sm border border-ink-200 rounded-lg bg-white text-ink-900',
          'focus:outline-none focus:ring-2 focus:ring-brand-600/20 focus:border-brand-600',
          className
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400 pointer-events-none" />
    </div>
  )
}

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
          checked ? 'bg-brand-600' : 'bg-ink-200'
        )}
      >
        <span
          className={cn(
            'inline-block h-4 w-4 rounded-full bg-white transition-transform',
            checked ? 'translate-x-6' : 'translate-x-1'
          )}
        />
      </button>
      <span className="text-sm text-ink-700">{label}</span>
    </label>
  )
}

/* ── Page ── */

export default function NewArticlePage() {
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [kicker, setKicker] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [areaId, setAreaId] = useState('')
  const [body, setBody] = useState('')
  const [featureImage, setFeatureImage] = useState('')
  const [featureImageAlt, setFeatureImageAlt] = useState('')
  const [tags, setTags] = useState('')
  const [metaTitle, setMetaTitle] = useState('')
  const [metaDescription, setMetaDescription] = useState('')
  const [canonicalUrl, setCanonicalUrl] = useState('')
  const [status, setStatus] = useState<string>('DRAFT')
  const [featured, setFeatured] = useState(false)
  const [sponsored, setSponsored] = useState(false)
  const [sponsorName, setSponsorName] = useState('')
  const [publishDate, setPublishDate] = useState('')
  const [saving, setSaving] = useState(false)

  const handleTitleChange = useCallback((value: string) => {
    setTitle(value)
    setSlug(slugify(value))
  }, [])

  async function handleSave() {
    setSaving(true)
    const payload = {
      title, slug, kicker, subtitle, categoryId, areaId, body,
      featureImage, featureImageAlt,
      tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
      metaTitle, metaDescription, canonicalUrl,
      status, featured, sponsored, sponsorName,
      publishedAt: publishDate || null,
    }
    console.log('Save article:', payload)
    // TODO: POST to /api/admin/articles
    await new Promise((r) => setTimeout(r, 500))
    alert('Article saved (mock)')
    setSaving(false)
  }

  async function handleGenerateAI() {
    if (!title) {
      alert('Enter a title first so the AI knows what to write about.')
      return
    }
    console.log('Generate AI content for:', title)
    // TODO: Call Groq via /api/admin/ai/generate
    alert('AI generation triggered (mock). The body will be populated when ready.')
  }

  async function handleGenerateSEO() {
    if (!title) {
      alert('Enter a title first.')
      return
    }
    console.log('Generate SEO for:', title)
    setMetaTitle(title + ' | LondonTodo')
    setMetaDescription(`Discover ${title.toLowerCase()}. Your guide from LondonTodo.`)
    alert('SEO fields populated (mock).')
  }

  return (
    <div className="max-w-4xl">
      {/* Breadcrumb */}
      <nav className="text-sm text-ink-400 mb-1">
        <Link href="/admin" className="hover:text-ink-600">Admin</Link>
        <span className="mx-1.5">/</span>
        <Link href="/admin/articles" className="hover:text-ink-600">Articles</Link>
        <span className="mx-1.5">/</span>
        <span className="text-ink-600">New</span>
      </nav>

      <div className="flex items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl font-display font-bold text-ink-900">New Article</h1>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleGenerateAI}
            className="inline-flex items-center gap-2 border border-ink-200 text-ink-700 text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-ink-50 transition-colors"
          >
            <Sparkles className="h-4 w-4" />
            Generate with AI
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 bg-brand-600 text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-brand-700 transition-colors disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="e.g. Best Rooftop Bars in South London"
            />
          </div>

          {/* Slug */}
          <div>
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="best-rooftop-bars-south-london"
            />
          </div>

          {/* Kicker */}
          <div>
            <Label htmlFor="kicker" optional>Kicker</Label>
            <Input
              id="kicker"
              value={kicker}
              onChange={(e) => setKicker(e.target.value)}
              placeholder="e.g. FOOD & DRINK"
            />
          </div>

          {/* Subtitle */}
          <div>
            <Label htmlFor="subtitle" optional>Subtitle</Label>
            <Input
              id="subtitle"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="A short subtitle or deck"
            />
          </div>

          {/* Body */}
          <div>
            <Label htmlFor="body">Body</Label>
            <textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={16}
              placeholder="Write your article here..."
              className="w-full px-3 py-2 text-sm border border-ink-200 rounded-lg bg-white text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-brand-600/20 focus:border-brand-600 resize-y"
            />
          </div>

          {/* Feature image */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="featureImage" optional>Feature Image URL</Label>
              <Input
                id="featureImage"
                value={featureImage}
                onChange={(e) => setFeatureImage(e.target.value)}
                placeholder="https://..."
              />
            </div>
            <div>
              <Label htmlFor="featureImageAlt" optional>Image Alt Text</Label>
              <Input
                id="featureImageAlt"
                value={featureImageAlt}
                onChange={(e) => setFeatureImageAlt(e.target.value)}
                placeholder="Describe the image"
              />
            </div>
          </div>

          {/* Tags */}
          <div>
            <Label htmlFor="tags" optional>Tags</Label>
            <Input
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="rooftop, bars, south london (comma-separated)"
            />
          </div>

          {/* SEO */}
          <div className="border-t border-ink-100 pt-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-display font-semibold text-ink-900">SEO</h2>
              <button
                type="button"
                onClick={handleGenerateSEO}
                className="inline-flex items-center gap-1.5 text-sm text-brand-600 hover:text-brand-700 font-medium"
              >
                <Search className="h-3.5 w-3.5" />
                Generate SEO
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="metaTitle" optional>Meta Title</Label>
                <Input
                  id="metaTitle"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  placeholder="SEO title (defaults to article title)"
                />
              </div>
              <div>
                <Label htmlFor="metaDescription" optional>Meta Description</Label>
                <textarea
                  id="metaDescription"
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  rows={3}
                  placeholder="SEO description (150-160 chars)"
                  className="w-full px-3 py-2 text-sm border border-ink-200 rounded-lg bg-white text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-brand-600/20 focus:border-brand-600 resize-y"
                />
                <p className="text-xs text-ink-400 mt-1">{metaDescription.length}/160 characters</p>
              </div>
              <div>
                <Label htmlFor="canonicalUrl" optional>Canonical URL</Label>
                <Input
                  id="canonicalUrl"
                  value={canonicalUrl}
                  onChange={(e) => setCanonicalUrl(e.target.value)}
                  placeholder="https://..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status */}
          <div className="bg-white border border-ink-100 rounded-xl p-5 space-y-5">
            <div>
              <Label htmlFor="status">Status</Label>
              <Select id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                {statusOptions.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </Select>
            </div>

            {/* Publish date */}
            <div>
              <Label htmlFor="publishDate" optional>Publish Date</Label>
              <Input
                id="publishDate"
                type="datetime-local"
                value={publishDate}
                onChange={(e) => setPublishDate(e.target.value)}
              />
            </div>
          </div>

          {/* Category & Area */}
          <div className="bg-white border border-ink-100 rounded-xl p-5 space-y-5">
            <div>
              <Label htmlFor="category">Category</Label>
              <Select id="category" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                <option value="">Select category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </Select>
            </div>
            <div>
              <Label htmlFor="area">Area</Label>
              <Select id="area" value={areaId} onChange={(e) => setAreaId(e.target.value)}>
                <option value="">Select area</option>
                {areas.map((a) => (
                  <option key={a.id} value={a.id}>{a.name}</option>
                ))}
              </Select>
            </div>
          </div>

          {/* Toggles */}
          <div className="bg-white border border-ink-100 rounded-xl p-5 space-y-4">
            <Toggle checked={featured} onChange={setFeatured} label="Featured" />
            <Toggle checked={sponsored} onChange={setSponsored} label="Sponsored" />
            {sponsored && (
              <div>
                <Label htmlFor="sponsorName">Sponsor Name</Label>
                <Input
                  id="sponsorName"
                  value={sponsorName}
                  onChange={(e) => setSponsorName(e.target.value)}
                  placeholder="e.g. TimeOut"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
