'use client'

import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'

export default function SearchBar({ initialQuery = '' }) {
  const [query, setQuery] = useState(initialQuery)
  const router = useRouter()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    router.push(`/?query=${encodeURIComponent(query)}`)
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search albums..."
        className="w-full rounded border p-2"
      />
      <button
        type="submit"
        className="mt-2 rounded bg-primary px-4 py-2 text-white transition-colors hover:bg-blue-600"
      >
        Search
      </button>
    </form>
  )
}
