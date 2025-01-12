import { Album } from '@/lib/api'
import Image from 'next/image'

export default function AlbumCard({ album }: { album: Album }) {
  return (
    <div className="h-full w-auto rounded border object-cover p-4">
      {album.images[0].type === 'video/mp4' ? (
        <video
          src={album.images[0].link}
          className="mb-2 h-64 w-full object-cover"
          muted
          loop
          autoPlay
          playsInline
        />
      ) : (
        <Image
          src={album.images[0].link}
          alt={album.title}
          width={300}
          height={300}
          className="mb-2 h-64 w-full object-cover"
        />
      )}
      <h2 className="text-xl font-semibold">{album.title}</h2>
      <p className="text-sm text-gray-600">{album.account_url}</p>
      <p className="text-sm text-gray-600">{album.views} views</p>
    </div>
  )
}
