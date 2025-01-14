export type Album = {
  link: string
  views: number
  account_url: string
  images: AlbumImage[]
  id: string
  title: string
  cover: string
}

export type AlbumImage = {
  type: string
  gifv?: string
  link: string
  title?: string
  id: string
}

export async function getAlbums(query: string): Promise<{ albums: Album[] }> {
  if (query === undefined || query === '') {
    return { albums: [] }
  }
  const res = await fetch(`http://localhost:3000/api/albums?query=${query}`)
  const albums = (await res.json()).data as Album[]

  return { albums }
}

export async function getAlbum(id: string): Promise<Album> {
  const res = await fetch(`http://localhost:3000/api/albums/${id}`)
  const album = (await res.json()).data as Album

  return album
}
