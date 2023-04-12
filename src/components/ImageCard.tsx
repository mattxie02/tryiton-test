import type { Photo } from "@/utils/types";
import Image from "next/image";
import { useState } from 'react';
import RequestEditModal from "./RequestEditModal";
import EditModal from "./EditModal";

export default function ImageCard({ photo }: { photo: Photo }) {
  const { urls, alt_description } = photo;
  const [isRequestEditModalOpen, setRequestEditModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState(urls.regular);

  const handleEditModalClose = (url?: string) => {
    setEditModalOpen(false);
    if (url) {
      setImageUrl(url);
    }
  };

  return (
    <div className="flex flex-col px-2 mb-10 block w-1/5">
      <div className="after:content group relative after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight">
        <Image
          alt={alt_description ?? ''}
          className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
          style={{ transform: 'translate3d(0, 0, 0)' }}
          src={imageUrl}
          width={480}
          height={320}
          sizes="(max-width: 640px) 100vw,
            (max-width: 1280px) 50vw,
            (max-width: 1536px) 33vw,
            25vw"
        />
      </div>
      <div className="flex mt-3 gap-5 mx-3">
        <button className="simple-button px-2 py-1 flex-1" onClick={() => setEditModalOpen(true)}>Edit</button>
        <button className="simple-button px-2 py-1 flex-1" onClick={() => setRequestEditModalOpen(true)}>Request Edit</button>
      </div>
      <RequestEditModal isOpen={isRequestEditModalOpen} setOpen={setRequestEditModalOpen} url={imageUrl}/>
      <EditModal isOpen={isEditModalOpen} onClose={handleEditModalClose} url={imageUrl}/>
    </div>
  );
}
