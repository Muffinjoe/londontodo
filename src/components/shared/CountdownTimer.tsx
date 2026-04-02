'use client'

import { useState, useEffect } from 'react'
import { Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

const TARGET_DATE = new Date('2026-05-25T12:00:00+01:00')

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function calcTimeLeft(): TimeLeft {
  const diff = TARGET_DATE.getTime() - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null)

  useEffect(() => {
    setTimeLeft(calcTimeLeft())
    const id = setInterval(() => setTimeLeft(calcTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  const units: { key: keyof TimeLeft; label: string }[] = [
    { key: 'days', label: 'Days' },
    { key: 'hours', label: 'Hours' },
    { key: 'minutes', label: 'Mins' },
    { key: 'seconds', label: 'Secs' },
  ]

  return (
    <div className="rounded-lg border border-ink-100 bg-white p-5">
      <div className="mb-4 flex items-center gap-2">
        <Clock className="h-5 w-5 text-brand-600" />
        <h3 className="font-display text-sm font-extrabold uppercase tracking-wide text-ink-900">
          Countdown to City Splash
        </h3>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {units.map(({ key, label }) => (
          <div
            key={key}
            className="flex flex-col items-center rounded-md bg-ink-50 px-2 py-3"
          >
            <span className={cn(
              'font-display text-2xl font-extrabold tabular-nums text-brand-600',
              !timeLeft && 'opacity-0',
            )}>
              {timeLeft ? String(timeLeft[key]).padStart(2, '0') : '00'}
            </span>
            <span className="mt-0.5 text-xs font-medium text-ink-500">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
