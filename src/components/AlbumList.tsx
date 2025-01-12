import { getAlbums } from '@/lib/api'
import Link from 'next/link'

import AlbumCard from './AlbumCard'

export default async function AlbumList({ query }: { query: string }) {
  const { albums } = await getAlbums(query)

  if (!albums || albums.length === 0) {
    return (
      <div className="mt-8 text-center">
        No albums found. Try a different search term.
      </div>
    )
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {albums.map((album) => (
          <Link href={`/album/${album.id}?query=cat`} key={album.id}>
            <AlbumCard album={album} />
          </Link>
        ))}
      </div>
    </div>
  )
}
