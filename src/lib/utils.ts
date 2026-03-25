import { format, formatDistanceToNow, isThisWeek, isToday, isTomorrow } from 'date-fns'

export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}

export function formatDate(date: Date | string) {
  const d = new Date(date)
  return format(d, 'd MMMM yyyy')
}

export function formatDateShort(date: Date | string) {
  const d = new Date(date)
  return format(d, 'd MMM yyyy')
}

export function formatEventDate(start: Date | string, end?: Date | string | null) {
  const s = new Date(start)
  if (isToday(s)) return 'Today'
  if (isTomorrow(s)) return 'Tomorrow'
  if (isThisWeek(s)) return format(s, 'EEEE')
  const startStr = format(s, 'd MMM')
  if (end) {
    const e = new Date(end)
    return `${startStr} – ${format(e, 'd MMM')}`
  }
  return startStr
}

export function timeAgo(date: Date | string) {
  return formatDistanceToNow(new Date(date), { addSuffix: true })
}

export function readingTime(text: string): number {
  const words = text.split(/\s+/).length
  return Math.max(1, Math.ceil(words / 230))
}

export function truncate(str: string, length: number) {
  if (str.length <= length) return str
  return str.slice(0, length).replace(/\s+\S*$/, '') + '…'
}

export function formatPrice(min?: number | null, max?: number | null, type?: string) {
  if (type === 'FREE') return 'Free'
  if (type === 'DONATION') return 'Pay what you wish'
  if (min && max && min !== max) return `£${min}–£${max}`
  if (min) return `From £${min}`
  if (max) return `Up to £${max}`
  return 'See website'
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '')
}

export const SITE_NAME = 'LondonTodo'
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://londontodo.com'
export const SITE_DESCRIPTION = 'Your guide to the best things to do in London. Events, exhibitions, restaurants, bars, markets, and neighbourhood guides.'
