import { Play } from 'lucide-react'

interface VideoEmbedProps {
  url?: string
  caption?: string
}

export default function VideoEmbed({ url, caption }: VideoEmbedProps) {
  return (
    <figure className="my-8">
      <div className="relative w-full overflow-hidden rounded-lg bg-ink-900" style={{ paddingBottom: '56.25%' }}>
        {url ? (
          <iframe
            src={url}
            title={caption || 'Video embed'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white/70">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 backdrop-blur">
              <Play className="h-8 w-8 text-white" />
            </div>
            <span className="text-sm font-medium">Video coming soon</span>
          </div>
        )}
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-ink-400">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
