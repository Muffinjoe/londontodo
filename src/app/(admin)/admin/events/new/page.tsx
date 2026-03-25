'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { Save, ChevronDown } from 'lucide-react'
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
  { id: 'cat-8', name: 'Festivals' },
  { id: 'cat-9', name: 'Film' },
  { id: 'cat-10', name: 'Music' },
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
  { id: 'area-11', name: 'Richmond' },
]

const venues = [
  { id: 'ven-1', name: 'Somerset House' },
  { id: 'ven-2', name: 'Barbican Centre' },
  { id: 'ven-3', name: 'O2 Arena' },
  { id: 'ven-4', name: 'Ronnie Scotts' },
  { id: 'ven-5', name: 'Kew Gardens' },
]

const statusOptions = ['DRAFT', 'REVIEW', 'SCHEDULED', 'PUBLISHED'] as const
const priceTypes = ['FREE', 'PAID', 'DONATION'] as const

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

export default function NewEventPage() {
  // Core
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [description, setDescription] = useState('')
  const [shortSummary, setShortSummary] = useState('')
  const [whyGo, setWhyGo] = useState('')
  const [worthItIf, setWorthItIf] = useState('')

  // Taxonomy
  const [categoryId, setCategoryId] = useState('')
  const [areaId, setAreaId] = useState('')
  const [venueId, setVenueId] = useState('')

  // Dates & times
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [recurring, setRecurring] = useState(false)
  const [recurrenceRule, setRecurrenceRule] = useState('')

  // Pricing
  const [priceType, setPriceType] = useState<string>('PAID')
  const [priceMin, setPriceMin] = useState('')
  const [priceMax, setPriceMax] = useState('')

  // Links
  const [ticketUrl, setTicketUrl] = useState('')
  const [websiteUrl, setWebsiteUrl] = useState('')

  // Media
  const [featureImage, setFeatureImage] = useState('')
  const [galleryImages, setGalleryImages] = useState('')

  // Flags
  const [familyFriendly, setFamilyFriendly] = useState(false)
  const [isDaytime, setIsDaytime] = useState(true)
  const [isNightlife, setIsNightlife] = useState(false)

  // SEO
  const [metaTitle, setMetaTitle] = useState('')
  const [metaDescription, setMetaDescription] = useState('')

  // Publishing
  const [status, setStatus] = useState<string>('DRAFT')
  const [featured, setFeatured] = useState(false)
  const [sponsored, setSponsored] = useState(false)
  const [sponsorName, setSponsorName] = useState('')

  const [saving, setSaving] = useState(false)

  const handleTitleChange = useCallback((value: string) => {
    setTitle(value)
    setSlug(slugify(value))
  }, [])

  async function handleSave() {
    setSaving(true)
    const payload = {
      title, slug, description, shortSummary, whyGo, worthItIf,
      categoryId, areaId, venueId,
      startDate, endDate: endDate || null, startTime: startTime || null, endTime: endTime || null,
      recurring, recurrenceRule: recurring ? recurrenceRule : null,
      priceType, priceMin: priceMin ? parseFloat(priceMin) : null, priceMax: priceMax ? parseFloat(priceMax) : null,
      ticketUrl: ticketUrl || null, websiteUrl: websiteUrl || null,
      featureImage: featureImage || null,
      galleryImages: galleryImages.split(',').map((s) => s.trim()).filter(Boolean),
      familyFriendly, isDaytime, isNightlife,
      metaTitle: metaTitle || null, metaDescription: metaDescription || null,
      status, featured, sponsored, sponsorName: sponsored ? sponsorName : null,
    }
    console.log('Save event:', payload)
    // TODO: POST to /api/admin/events
    await new Promise((r) => setTimeout(r, 500))
    alert('Event saved (mock)')
    setSaving(false)
  }

  return (
    <div className="max-w-4xl">
      {/* Breadcrumb */}
      <nav className="text-sm text-ink-400 mb-1">
        <Link href="/admin" className="hover:text-ink-600">Admin</Link>
        <span className="mx-1.5">/</span>
        <Link href="/admin/events" className="hover:text-ink-600">Events</Link>
        <span className="mx-1.5">/</span>
        <span className="text-ink-600">New</span>
      </nav>

      <div className="flex items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl font-display font-bold text-ink-900">New Event</h1>
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

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <div>
            <Label htmlFor="title">Title</Label>
            <Input id="title" value={title} onChange={(e) => handleTitleChange(e.target.value)} placeholder="e.g. Summer Screen at Somerset House" />
          </div>

          {/* Slug */}
          <div>
            <Label htmlFor="slug">Slug</Label>
            <Input id="slug" value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="summer-screen-somerset-house" />
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={8}
              placeholder="Full event description..."
              className="w-full px-3 py-2 text-sm border border-ink-200 rounded-lg bg-white text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-brand-600/20 focus:border-brand-600 resize-y"
            />
          </div>

          {/* Short summary */}
          <div>
            <Label htmlFor="shortSummary" optional>Short Summary</Label>
            <Input id="shortSummary" value={shortSummary} onChange={(e) => setShortSummary(e.target.value)} placeholder="One-liner for cards and previews" />
          </div>

          {/* Why go / Worth it if */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="whyGo" optional>Why Go</Label>
              <textarea
                id="whyGo"
                value={whyGo}
                onChange={(e) => setWhyGo(e.target.value)}
                rows={3}
                placeholder="Why should someone attend?"
                className="w-full px-3 py-2 text-sm border border-ink-200 rounded-lg bg-white text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-brand-600/20 focus:border-brand-600 resize-y"
              />
            </div>
            <div>
              <Label htmlFor="worthItIf" optional>Worth It If</Label>
              <textarea
                id="worthItIf"
                value={worthItIf}
                onChange={(e) => setWorthItIf(e.target.value)}
                rows={3}
                placeholder="Worth it if you..."
                className="w-full px-3 py-2 text-sm border border-ink-200 rounded-lg bg-white text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-brand-600/20 focus:border-brand-600 resize-y"
              />
            </div>
          </div>

          {/* Dates & Times */}
          <div className="border-t border-ink-100 pt-6">
            <h2 className="text-base font-display font-semibold text-ink-900 mb-4">Date & Time</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate">Start Date</Label>
                <Input id="startDate" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="endDate" optional>End Date</Label>
                <Input id="endDate" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="startTime" optional>Start Time</Label>
                <Input id="startTime" type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="endTime" optional>End Time</Label>
                <Input id="endTime" type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
              </div>
            </div>
            <div className="mt-4 space-y-3">
              <Toggle checked={recurring} onChange={setRecurring} label="Recurring event" />
              {recurring && (
                <div>
                  <Label htmlFor="recurrenceRule">Recurrence Rule</Label>
                  <Input id="recurrenceRule" value={recurrenceRule} onChange={(e) => setRecurrenceRule(e.target.value)} placeholder="e.g. Every Saturday" />
                </div>
              )}
            </div>
          </div>

          {/* Pricing */}
          <div className="border-t border-ink-100 pt-6">
            <h2 className="text-base font-display font-semibold text-ink-900 mb-4">Pricing</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="priceType">Price Type</Label>
                <Select id="priceType" value={priceType} onChange={(e) => setPriceType(e.target.value)}>
                  {priceTypes.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </Select>
              </div>
              {priceType === 'PAID' && (
                <>
                  <div>
                    <Label htmlFor="priceMin" optional>Min Price (&pound;)</Label>
                    <Input id="priceMin" type="number" step="0.01" value={priceMin} onChange={(e) => setPriceMin(e.target.value)} placeholder="0.00" />
                  </div>
                  <div>
                    <Label htmlFor="priceMax" optional>Max Price (&pound;)</Label>
                    <Input id="priceMax" type="number" step="0.01" value={priceMax} onChange={(e) => setPriceMax(e.target.value)} placeholder="0.00" />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Links */}
          <div className="border-t border-ink-100 pt-6">
            <h2 className="text-base font-display font-semibold text-ink-900 mb-4">Links</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="ticketUrl" optional>Ticket URL</Label>
                <Input id="ticketUrl" value={ticketUrl} onChange={(e) => setTicketUrl(e.target.value)} placeholder="https://..." />
              </div>
              <div>
                <Label htmlFor="websiteUrl" optional>Website URL</Label>
                <Input id="websiteUrl" value={websiteUrl} onChange={(e) => setWebsiteUrl(e.target.value)} placeholder="https://..." />
              </div>
            </div>
          </div>

          {/* Media */}
          <div className="border-t border-ink-100 pt-6">
            <h2 className="text-base font-display font-semibold text-ink-900 mb-4">Media</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="featureImage" optional>Feature Image URL</Label>
                <Input id="featureImage" value={featureImage} onChange={(e) => setFeatureImage(e.target.value)} placeholder="https://..." />
              </div>
              <div>
                <Label htmlFor="galleryImages" optional>Gallery Images</Label>
                <Input id="galleryImages" value={galleryImages} onChange={(e) => setGalleryImages(e.target.value)} placeholder="Comma-separated URLs" />
              </div>
            </div>
          </div>

          {/* SEO */}
          <div className="border-t border-ink-100 pt-6">
            <h2 className="text-base font-display font-semibold text-ink-900 mb-4">SEO</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="metaTitle" optional>Meta Title</Label>
                <Input id="metaTitle" value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} placeholder="SEO title" />
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
          </div>

          {/* Category, Area, Venue */}
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
            <div>
              <Label htmlFor="venue" optional>Venue</Label>
              <Select id="venue" value={venueId} onChange={(e) => setVenueId(e.target.value)}>
                <option value="">Select venue</option>
                {venues.map((v) => (
                  <option key={v.id} value={v.id}>{v.name}</option>
                ))}
              </Select>
            </div>
          </div>

          {/* Flags */}
          <div className="bg-white border border-ink-100 rounded-xl p-5 space-y-4">
            <Toggle checked={familyFriendly} onChange={setFamilyFriendly} label="Family Friendly" />
            <Toggle checked={isDaytime} onChange={setIsDaytime} label="Daytime" />
            <Toggle checked={isNightlife} onChange={setIsNightlife} label="Nightlife" />
          </div>

          {/* Featured / Sponsored */}
          <div className="bg-white border border-ink-100 rounded-xl p-5 space-y-4">
            <Toggle checked={featured} onChange={setFeatured} label="Featured" />
            <Toggle checked={sponsored} onChange={setSponsored} label="Sponsored" />
            {sponsored && (
              <div>
                <Label htmlFor="sponsorName">Sponsor Name</Label>
                <Input id="sponsorName" value={sponsorName} onChange={(e) => setSponsorName(e.target.value)} placeholder="e.g. Eventbrite" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
