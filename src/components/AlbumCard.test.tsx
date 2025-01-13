import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import AlbumCard from './AlbumCard'

describe('AlbumCard', () => {
  it('renders video if type is video/mp4', () => {
    const album = {
      id: 'fake-id',
      title: 'Video Album',
      link: 'fake-link',
      account_url: 'fake-account-url',
      cover: 'fake-cover',
      views: 100,
      images: [
        {
          id: 'fake-image-id',
          link: 'fake-video-link.mp4',
          type: 'video/mp4',
        },
      ],
    }
    const { container } = render(<AlbumCard album={album} />)
    const videoElement = container.querySelector('video')
    expect(videoElement).not.toBeNull()
  })

  it('renders image if type is not video/mp4', () => {
    const album = {
      id: 'fake-id',
      title: 'Image Album',
      link: 'fake-link',
      account_url: 'fake-account-url',
      cover: 'fake-cover',
      views: 200,
      images: [
        {
          id: 'fake-image-id',
          link: 'https://i.imgur.com/fake-image-link.jpg',
          type: 'image/jpg',
        },
      ],
    }
    render(<AlbumCard album={album} />)
    expect(screen.getByAltText('Image Album')).toBeInTheDocument()
  })
})
