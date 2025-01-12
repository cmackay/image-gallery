import ImageGrid from "@/components/ImageGrid";
import { getAlbum } from "@/lib/api";
import Link from "next/link";
import { Suspense } from "react";

export default async function AlbumPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ query?: string }>;
}) {
  const { id } = await params;
  const { query } = await searchParams;
  return (
    <div className="container mx-auto p-4">
      <Link
        href={`/?query=${encodeURIComponent(query || "")}`}
        className="text-primary hover:underline mb-4 inline-block"
      >
        &larr; Back to search
      </Link>
      <Suspense
        fallback={<div className="text-center mt-8">Loading album...</div>}
      >
        <AlbumContent id={id} />
      </Suspense>
    </div>
  );
}

async function AlbumContent({ id }: { id: string }) {
  const album = await getAlbum(id);

  return (
    <>
      <h1 className="text-3xl font-bold mb-4">{album.title}</h1>
      <p className="mb-4">By: {album.account_url}</p>
      <p className="mb-4">Views: {album.views}</p>
      <ImageGrid images={album.images} />
    </>
  );
}
