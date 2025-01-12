'use client'

import { useRouter } from 'next/navigation'
import { FormEvent, startTransition, useState } from 'react'

export default function SearchBar({ initialQuery = '' }) {
  const [query, setQuery] = useState(initialQuery)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    startTransition(() => {
      router.push(`/?query=${encodeURIComponent(query)}`)
      setLoading(false)
    })
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      {loading && (
        <div className="pointer-events-none absolute inset-0 z-10 bg-white/10 backdrop-blur-sm backdrop-grayscale">
          <div className="flex h-full items-center justify-center">
            <div className="text-4xl font-bold text-white">Loading...</div>
          </div>
        </div>
      )}
      <input
        type="text"
        value={query}
        disabled={loading}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search albums..."
        className="w-full rounded border p-2"
      />
      <button
        type="submit"
        className="mt-2 rounded bg-primary px-4 py-2 text-white transition-colors hover:bg-blue-600"
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Search'}
      </button>
    </form>
  )
}
