export type Album = {
  link: string;
  account_url: number;
  views: number;
  images: AlbumImage[];
  userId: number;
  id: number;
  title: string;
  cover: string;
};

export type AlbumImage = {
  type: string;
  gifv: string;
  link: string;
  title: string;
  id: string;
};

export async function getAlbums(query: string): Promise<{ albums: Album[] }> {
  const res = await fetch(`http://localhost:3000/api/albums?query=${query}`);
  const albums = (await res.json()).data as Album[];

  return { albums };
}

export async function getAlbum(id: string): Promise<Album> {
  const res = await fetch(`http://localhost:3000/api/albums/${id}`);
  const album = (await res.json()).data as Album;

  return album;
}
