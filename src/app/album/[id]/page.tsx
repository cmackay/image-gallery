import ImageGrid from '@/components/ImageGrid'
import { getAlbum } from '@/lib/api'
import Link from 'next/link'
import { Suspense } from 'react'

export default async function AlbumPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ query?: string }>
}) {
  const { id } = await params
  const { query } = await searchParams
  return (
    <div className="container mx-auto p-4">
      <Link
        href={`/?query=${encodeURIComponent(query || '')}`}
        className="mb-4 inline-block text-primary hover:underline"
      >
        &larr; Back to search
      </Link>
      <Suspense
        fallback={<div className="mt-8 text-center">Loading album...</div>}
      >
        <AlbumContent id={id} />
      </Suspense>
    </div>
  )
}

async function AlbumContent({ id }: { id: string }) {
  const album = await getAlbum(id)

  return (
    <>
      <h1 className="mb-4 text-3xl font-bold">{album.title}</h1>
      <p className="mb-4">By: {album.account_url}</p>
      <p className="mb-4">Views: {album.views}</p>
      <ImageGrid images={album.images} />
    </>
  )
}
