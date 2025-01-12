import AlbumList from '@/components/AlbumList'
import SearchBar from '@/components/SearchBar'
import { Suspense, use } from 'react'

type SearchParams = Promise<{ query: string }>

export default function Home(props: { searchParams: SearchParams }) {
  const searchParams = use(props.searchParams)
  const query = searchParams.query || ''

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
