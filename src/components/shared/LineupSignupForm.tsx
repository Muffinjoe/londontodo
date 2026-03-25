'use client'

export default function LineupSignupForm() {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="mt-6 flex flex-col gap-3 sm:flex-row"
    >
      <input
        type="email"
        placeholder="Your email address"
        aria-label="Email address"
        className="flex-1 rounded-full border border-ink-200 bg-white px-5 py-3 text-sm text-ink-900 placeholder:text-ink-400 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/20"
      />
      <button
        type="submit"
        className="rounded-full bg-brand-600 px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-700"
      >
        Notify Me
      </button>
    </form>
  )
}
