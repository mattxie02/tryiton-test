import Head from 'next/head';
import { trpc } from "@/utils/trpc";
import ImageCard from '@/components/ImageCard';

export default function Editor() {
  const images = trpc.image.all.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });
  return (
    <>
      <Head>
        <title>Edit | Tryiton</title>
      </Head>
      <main className="mx-auto max-w-[1960px] p-4 flex justify-center flex-wrap">
        {images.data ? images.data.map(photo => (
          <ImageCard key={photo.id} photo={photo}/>
        )) : (
          "Loading..."
        )}
      </main>
    </>
  );
}
