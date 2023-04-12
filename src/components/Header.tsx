import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full mt-5 border-b-2 pb-7 sm:px-4 px-2">
      <Link href="/">
        <h1 className="sm:text-4xl text-2xl font-bold ml-2 tracking-tight inline">
          Try it on
        </h1>
      </Link>
    </header>
  );
}
