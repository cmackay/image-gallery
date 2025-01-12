'use client'

import { AlbumImage } from '@/lib/api'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function ImageGrid({ images }: { images: AlbumImage[] }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1)
      setSelectedImage(hash || null)
    }

    window.addEventListener('hashchange', handleHashChange)
    handleHashChange()

    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const selected = images.find((img) => img.id === selectedImage)

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {images.map((image) => (
          <div key={image.id} className="relative">
            <a
              href={`#${image.id}`}
              onClick={(e) => {
                e.preventDefault()
                setSelectedImage(image.id)
                window.history.pushState(null, '', `#${image.id}`)
              }}
            >
              {image.type === 'video/mp4' ? (
                <video
                  src={image.link}
                  className="mb-2 h-64 w-full object-cover"
                  muted
                  loop
                  autoPlay
                  playsInline
                />
              ) : (
                <Image
                  src={image.link}
                  alt={image.title || 'Album image'}
                  width={300}
                  height={300}
                  className="h-full rounded-lg object-cover shadow-md transition-shadow hover:shadow-lg"
                />
              )}
            </a>
          </div>
        ))}
      </div>
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
          onClick={() => {
            setSelectedImage(null)
            window.history.pushState(null, '', window.location.pathname)
          }}
        >
          {selected.type === 'video/mp4' ? (
            <video
              src={selected.link}
              className="mb-2"
              loop
              autoPlay
              playsInline
            />
          ) : (
            <Image
              src={selected.link}
              alt="Full screen image"
              layout="fill"
              objectFit="contain"
            />
          )}
        </div>
      )}
    </div>
  )
}
