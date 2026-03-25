'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, Pencil, Check, X, Trash2, MapPin } from 'lucide-react'
import { slugify } from '@/lib/utils'

/* ── Seed data ── */

interface Area {
  id: string
  name: string
  slug: string
  description: string
  articleCount: number
  eventCount: number
  venueCount: number
}

const initialAreas: Area[] = [
  { id: 'area-1', name: 'Shoreditch', slug: 'shoreditch', description: 'East London creative hub', articleCount: 6, eventCount: 12, venueCount: 8 },
  { id: 'area-2', name: 'Soho', slug: 'soho', description: "London's entertainment district", articleCount: 5, eventCount: 9, venueCount: 15 },
  { id: 'area-3', name: 'Camden', slug: 'camden', description: 'Markets, music and counterculture', articleCount: 4, eventCount: 7, venueCount: 6 },
  { id: 'area-4', name: 'Hackney', slug: 'hackney', description: 'Trendy East London neighbourhood', articleCount: 7, eventCount: 5, venueCount: 4 },
  { id: 'area-5', name: 'Peckham', slug: 'peckham', description: 'South London food and art scene', articleCount: 3, eventCount: 4, venueCount: 5 },
  { id: 'area-6', name: 'Brixton', slug: 'brixton', description: 'Vibrant South London community', articleCount: 3, eventCount: 6, venueCount: 4 },
  { id: 'area-7', name: 'Covent Garden', slug: 'covent-garden', description: 'Theatre and shopping in the West End', articleCount: 2, eventCount: 8, venueCount: 10 },
  { id: 'area-8', name: 'South Bank', slug: 'south-bank', description: 'Arts and culture along the Thames', articleCount: 4, eventCount: 11, venueCount: 7 },
  { id: 'area-9', name: 'Notting Hill', slug: 'notting-hill', description: 'Colourful streets and Portobello Road', articleCount: 2, eventCount: 3, venueCount: 3 },
  { id: 'area-10', name: 'Greenwich', slug: 'greenwich', description: 'Maritime heritage and parks', articleCount: 2, eventCount: 4, venueCount: 5 },
  { id: 'area-11', name: 'Richmond', slug: 'richmond', description: 'Royal parks and riverside charm', articleCount: 1, eventCount: 2, venueCount: 2 },
  { id: 'area-12', name: 'Islington', slug: 'islington', description: 'Gastropubs and independent shops', articleCount: 3, eventCount: 3, venueCount: 6 },
]

/* ── Page ── */

export default function AreasPage() {
  const [areas, setAreas] = useState<Area[]>(initialAreas)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editName, setEditName] = useState('')
  const [editDescription, setEditDescription] = useState('')

  const [showNew, setShowNew] = useState(false)
  const [newName, setNewName] = useState('')
  const [newDescription, setNewDescription] = useState('')

  function startEdit(area: Area) {
    setEditingId(area.id)
    setEditName(area.name)
    setEditDescription(area.description)
  }

  function cancelEdit() {
    setEditingId(null)
  }

  function saveEdit(id: string) {
    setAreas((prev) =>
      prev.map((a) =>
        a.id === id
          ? { ...a, name: editName, slug: slugify(editName), description: editDescription }
          : a
      )
    )
    console.log('Update area', id, { name: editName, description: editDescription })
    alert('Area updated (mock)')
    setEditingId(null)
  }

  function handleDelete(id: string) {
    if (confirm('Delete this area?')) {
      setAreas((prev) => prev.filter((a) => a.id !== id))
      console.log('Delete area', id)
      alert('Area deleted (mock)')
    }
  }

  function handleAddNew() {
    if (!newName.trim()) return
    const newArea: Area = {
      id: `area-new-${Date.now()}`,
      name: newName,
      slug: slugify(newName),
      description: newDescription,
      articleCount: 0,
      eventCount: 0,
      venueCount: 0,
    }
    setAreas((prev) => [...prev, newArea])
    console.log('Add area:', newArea)
    alert('Area added (mock)')
    setNewName('')
    setNewDescription('')
    setShowNew(false)
  }

  return (
    <div className="max-w-4xl">
      {/* Breadcrumb */}
      <nav className="text-sm text-ink-400 mb-1">
        <Link href="/admin" className="hover:text-ink-600">Admin</Link>
        <span className="mx-1.5">/</span>
        <span className="text-ink-600">Areas</span>
      </nav>

      <div className="flex items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-display font-bold text-ink-900">Areas</h1>
        <button
          type="button"
          onClick={() => setShowNew(!showNew)}
          className="inline-flex items-center gap-2 bg-brand-600 text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-brand-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Area
        </button>
      </div>

      {/* New area form */}
      {showNew && (
        <div className="bg-white border border-ink-100 rounded-xl p-5 mb-6">
          <h2 className="text-sm font-semibold text-ink-900 mb-4">New Area</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-ink-500 mb-1">Name</label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Area name"
                className="w-full px-3 py-2 text-sm border border-ink-200 rounded-lg bg-white text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-brand-600/20 focus:border-brand-600"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-ink-500 mb-1">Description</label>
              <input
                type="text"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                placeholder="Short description"
                className="w-full px-3 py-2 text-sm border border-ink-200 rounded-lg bg-white text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-brand-600/20 focus:border-brand-600"
              />
            </div>
            <div className="flex items-end gap-2">
              <button
                type="button"
                onClick={handleAddNew}
                className="px-4 py-2 bg-brand-600 text-white text-sm font-medium rounded-lg hover:bg-brand-700 transition-colors"
              >
                Add
              </button>
              <button
                type="button"
                onClick={() => setShowNew(false)}
                className="px-4 py-2 border border-ink-200 text-ink-600 text-sm font-medium rounded-lg hover:bg-ink-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Areas list */}
      <div className="bg-white border border-ink-100 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-ink-100 bg-ink-50/50">
              <th className="text-left px-4 py-3 font-medium text-ink-500 w-8">
                <MapPin className="h-4 w-4 text-ink-400" />
              </th>
              <th className="text-left px-4 py-3 font-medium text-ink-500">Name</th>
              <th className="text-left px-4 py-3 font-medium text-ink-500 hidden md:table-cell">Description</th>
              <th className="text-left px-4 py-3 font-medium text-ink-500 hidden sm:table-cell">Articles</th>
              <th className="text-left px-4 py-3 font-medium text-ink-500 hidden sm:table-cell">Events</th>
              <th className="text-left px-4 py-3 font-medium text-ink-500 hidden lg:table-cell">Venues</th>
              <th className="text-right px-4 py-3 font-medium text-ink-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {areas.map((area) => (
              <tr key={area.id} className="border-b border-ink-50 last:border-0 hover:bg-ink-50/50 transition-colors">
                <td className="px-4 py-3">
                  <MapPin className="h-4 w-4 text-brand-600" />
                </td>
                <td className="px-4 py-3">
                  {editingId === area.id ? (
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full px-2 py-1 text-sm border border-ink-200 rounded bg-white text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-600/20 focus:border-brand-600"
                    />
                  ) : (
                    <div>
                      <span className="font-medium text-ink-900">{area.name}</span>
                      <span className="block text-xs text-ink-400">/{area.slug}</span>
                    </div>
                  )}
                </td>
                <td className="px-4 py-3 text-ink-500 hidden md:table-cell">
                  {editingId === area.id ? (
                    <input
                      type="text"
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      className="w-full px-2 py-1 text-sm border border-ink-200 rounded bg-white text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-600/20 focus:border-brand-600"
                    />
                  ) : (
                    <span className="text-sm">{area.description}</span>
                  )}
                </td>
                <td className="px-4 py-3 text-ink-500 hidden sm:table-cell">{area.articleCount}</td>
                <td className="px-4 py-3 text-ink-500 hidden sm:table-cell">{area.eventCount}</td>
                <td className="px-4 py-3 text-ink-500 hidden lg:table-cell">{area.venueCount}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    {editingId === area.id ? (
                      <>
                        <button
                          onClick={() => saveEdit(area.id)}
                          className="p-1.5 text-emerald-600 hover:bg-emerald-50 transition-colors rounded-md"
                          title="Save"
                        >
                          <Check className="h-4 w-4" />
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="p-1.5 text-ink-400 hover:text-ink-600 hover:bg-ink-50 transition-colors rounded-md"
                          title="Cancel"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => startEdit(area)}
                          className="p-1.5 text-ink-400 hover:text-brand-600 transition-colors rounded-md hover:bg-ink-50"
                          title="Edit"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(area.id)}
                          className="p-1.5 text-ink-400 hover:text-red-600 transition-colors rounded-md hover:bg-red-50"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-ink-400 mt-3">{areas.length} areas</p>
    </div>
  )
}
