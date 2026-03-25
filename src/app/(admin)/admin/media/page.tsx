'use client'

import { Upload, ImageIcon } from 'lucide-react'

export default function MediaPage() {
  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-ink-900">Media Library</h1>
          <p className="mt-1 text-sm text-ink-500">
            Upload and manage images for articles and events.
          </p>
        </div>
        <label className="btn-primary cursor-pointer gap-2">
          <Upload className="h-4 w-4" />
          Upload Image
          <input type="file" accept="image/*" className="hidden" />
        </label>
      </div>

      {/* Empty state */}
      <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-ink-200 py-20">
        <ImageIcon className="h-12 w-12 text-ink-300" />
        <p className="mt-4 text-sm font-medium text-ink-500">No images uploaded yet</p>
        <p className="mt-1 text-xs text-ink-400">
          Upload images to use in articles and events.
        </p>
        <label className="mt-4 cursor-pointer rounded-lg bg-ink-900 px-4 py-2 text-sm font-medium text-white hover:bg-ink-800">
          Choose files
          <input type="file" accept="image/*" multiple className="hidden" />
        </label>
      </div>
    </div>
  )
}
