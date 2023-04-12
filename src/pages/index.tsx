import Head from 'next/head';
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | Tryiton</title>
      </Head>
      <main className="mx-auto max-w-[1960px] p-4 flex justify-center">
        <Link href="/editor" className="simple-button mx-auto px-5 py-3">Enter site</Link>
      </main>
    </>
  );
}
