import { Album } from "@/lib/api";
import Image from "next/image";

export default function AlbumCard({ album }: { album: Album }) {
  return (
    <div className="border rounded h-full w-auto object-cover p-4">
      {album.images[0].type === "video/mp4" ? (
        <video
          src={album.images[0].link}
          className="w-full h-64 object-cover mb-2"
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
          className="w-full h-64 object-cover mb-2"
        />
      )}
      <h2 className="text-xl font-semibold">{album.title}</h2>
      <p className="text-sm text-gray-600">{album.account_url}</p>
      <p className="text-sm text-gray-600">{album.views} views</p>
    </div>
  );
}
