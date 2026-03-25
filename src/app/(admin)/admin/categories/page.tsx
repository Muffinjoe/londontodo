'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, Pencil, Check, X, Trash2, GripVertical } from 'lucide-react'
import { cn, slugify } from '@/lib/utils'

/* ── Seed data ── */

interface Category {
  id: string
  name: string
  slug: string
  description: string
  color: string
  icon: string
  sortOrder: number
  articleCount: number
  eventCount: number
}

const initialCategories: Category[] = [
  { id: 'cat-1', name: 'Things To Do', slug: 'things-to-do', description: 'The best activities and experiences in London', color: '#ed1148', icon: 'Star', sortOrder: 0, articleCount: 12, eventCount: 34 },
  { id: 'cat-2', name: 'Food & Drink', slug: 'food-and-drink', description: 'Restaurants, bars, cafes and more', color: '#f97316', icon: 'UtensilsCrossed', sortOrder: 1, articleCount: 18, eventCount: 8 },
  { id: 'cat-3', name: 'Markets', slug: 'markets', description: "London's best street and food markets", color: '#22c55e', icon: 'ShoppingBag', sortOrder: 2, articleCount: 6, eventCount: 15 },
  { id: 'cat-4', name: 'Nightlife', slug: 'nightlife', description: 'Clubs, bars and late-night spots', color: '#8b5cf6', icon: 'Music', sortOrder: 3, articleCount: 4, eventCount: 12 },
  { id: 'cat-5', name: 'Arts & Culture', slug: 'arts-and-culture', description: 'Museums, galleries, theatre and exhibitions', color: '#3b82f6', icon: 'Palette', sortOrder: 4, articleCount: 8, eventCount: 20 },
  { id: 'cat-6', name: 'Outdoors', slug: 'outdoors', description: 'Parks, walks and outdoor activities', color: '#10b981', icon: 'TreePine', sortOrder: 5, articleCount: 5, eventCount: 6 },
  { id: 'cat-7', name: 'Family', slug: 'family', description: 'Family-friendly activities and days out', color: '#ec4899', icon: 'Heart', sortOrder: 6, articleCount: 3, eventCount: 10 },
  { id: 'cat-8', name: 'Shopping', slug: 'shopping', description: 'Shopping guides and retail districts', color: '#f59e0b', icon: 'ShoppingCart', sortOrder: 7, articleCount: 2, eventCount: 3 },
]

/* ── Page ── */

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(initialCategories)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editName, setEditName] = useState('')
  const [editDescription, setEditDescription] = useState('')
  const [editColor, setEditColor] = useState('')

  // New category form
  const [showNew, setShowNew] = useState(false)
  const [newName, setNewName] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [newColor, setNewColor] = useState('#ed1148')

  function startEdit(cat: Category) {
    setEditingId(cat.id)
    setEditName(cat.name)
    setEditDescription(cat.description)
    setEditColor(cat.color)
  }

  function cancelEdit() {
    setEditingId(null)
  }

  function saveEdit(id: string) {
    setCategories((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, name: editName, slug: slugify(editName), description: editDescription, color: editColor }
          : c
      )
    )
    console.log('Update category', id, { name: editName, description: editDescription, color: editColor })
    alert('Category updated (mock)')
    setEditingId(null)
  }

  function handleDelete(id: string) {
    if (confirm('Delete this category?')) {
      setCategories((prev) => prev.filter((c) => c.id !== id))
      console.log('Delete category', id)
      alert('Category deleted (mock)')
    }
  }

  function handleAddNew() {
    if (!newName.trim()) return
    const newCat: Category = {
      id: `cat-new-${Date.now()}`,
      name: newName,
      slug: slugify(newName),
      description: newDescription,
      color: newColor,
      icon: 'Tag',
      sortOrder: categories.length,
      articleCount: 0,
      eventCount: 0,
    }
    setCategories((prev) => [...prev, newCat])
    console.log('Add category:', newCat)
    alert('Category added (mock)')
    setNewName('')
    setNewDescription('')
    setNewColor('#ed1148')
    setShowNew(false)
  }

  return (
    <div className="max-w-4xl">
      {/* Breadcrumb */}
      <nav className="text-sm text-ink-400 mb-1">
        <Link href="/admin" className="hover:text-ink-600">Admin</Link>
        <span className="mx-1.5">/</span>
        <span className="text-ink-600">Categories</span>
      </nav>

      <div className="flex items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-display font-bold text-ink-900">Categories</h1>
        <button
          type="button"
          onClick={() => setShowNew(!showNew)}
          className="inline-flex items-center gap-2 bg-brand-600 text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-brand-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Category
        </button>
      </div>

      {/* New category form */}
      {showNew && (
        <div className="bg-white border border-ink-100 rounded-xl p-5 mb-6">
          <h2 className="text-sm font-semibold text-ink-900 mb-4">New Category</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-ink-500 mb-1">Name</label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Category name"
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
              <div className="flex-1">
                <label className="block text-xs font-medium text-ink-500 mb-1">Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={newColor}
                    onChange={(e) => setNewColor(e.target.value)}
                    className="h-9 w-9 border border-ink-200 rounded cursor-pointer"
                  />
                  <span className="text-xs text-ink-400">{newColor}</span>
                </div>
              </div>
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

      {/* Categories list */}
      <div className="bg-white border border-ink-100 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-ink-100 bg-ink-50/50">
              <th className="text-left px-4 py-3 font-medium text-ink-500 w-8"></th>
              <th className="text-left px-4 py-3 font-medium text-ink-500">Name</th>
              <th className="text-left px-4 py-3 font-medium text-ink-500 hidden md:table-cell">Description</th>
              <th className="text-left px-4 py-3 font-medium text-ink-500 hidden sm:table-cell">Articles</th>
              <th className="text-left px-4 py-3 font-medium text-ink-500 hidden sm:table-cell">Events</th>
              <th className="text-right px-4 py-3 font-medium text-ink-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id} className="border-b border-ink-50 last:border-0 hover:bg-ink-50/50 transition-colors">
                <td className="px-4 py-3">
                  <div className="h-4 w-4 rounded" style={{ backgroundColor: cat.color }} />
                </td>
                <td className="px-4 py-3">
                  {editingId === cat.id ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="w-full px-2 py-1 text-sm border border-ink-200 rounded bg-white text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-600/20 focus:border-brand-600"
                      />
                      <input
                        type="color"
                        value={editColor}
                        onChange={(e) => setEditColor(e.target.value)}
                        className="h-7 w-7 border border-ink-200 rounded cursor-pointer"
                      />
                    </div>
                  ) : (
                    <div>
                      <span className="font-medium text-ink-900">{cat.name}</span>
                      <span className="block text-xs text-ink-400">/{cat.slug}</span>
                    </div>
                  )}
                </td>
                <td className="px-4 py-3 text-ink-500 hidden md:table-cell">
                  {editingId === cat.id ? (
                    <input
                      type="text"
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      className="w-full px-2 py-1 text-sm border border-ink-200 rounded bg-white text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-600/20 focus:border-brand-600"
                    />
                  ) : (
                    <span className="text-sm">{cat.description}</span>
                  )}
                </td>
                <td className="px-4 py-3 text-ink-500 hidden sm:table-cell">{cat.articleCount}</td>
                <td className="px-4 py-3 text-ink-500 hidden sm:table-cell">{cat.eventCount}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    {editingId === cat.id ? (
                      <>
                        <button
                          onClick={() => saveEdit(cat.id)}
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
                          onClick={() => startEdit(cat)}
                          className="p-1.5 text-ink-400 hover:text-brand-600 transition-colors rounded-md hover:bg-ink-50"
                          title="Edit"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(cat.id)}
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

      <p className="text-xs text-ink-400 mt-3">{categories.length} categories</p>
    </div>
  )
}
