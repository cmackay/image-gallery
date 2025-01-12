import AlbumList from '@/components/AlbumList'
import SearchBar from '@/components/SearchBar'
import { Suspense } from 'react'

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>
}) {
  const { query } = await searchParams

  return (
    <main className="container mx-auto p-4">
      <h1 className="mb-4 text-3xl font-bold">Album Search</h1>
      <SearchBar initialQuery={query} />
      <Suspense
        fallback={<div className="mt-8 text-center">Loading albums...</div>}
      >
        <AlbumList query={query} />
      </Suspense>
    </main>
  )
}
