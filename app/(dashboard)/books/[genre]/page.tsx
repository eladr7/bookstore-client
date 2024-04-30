import { Suspense } from "react";
import { BooksList } from "./BooksList";
import Loading from "../../loading";
import Link from "next/link";
import { ServerSideComponentProp } from "@/app/definitions";

export async function generateStaticParams() {
  // [{genre: 'scienceFiction'}, {genre: 'Drama'}, ...]
  const res = await fetch("http://localhost:5000/genres", {
    next: {
      revalidate: 3600,
    },
  });

  const genres = await res.json();

  return genres.map((genre: string) => ({ genre }));
}

const Genres: React.FC<ServerSideComponentProp<{ genre: string }>> = async ({
  params,
}) => {
  return (
    <main>
      <nav>
        <div className="flex flex-col justify-staret gap-2">
          <h2>Genres</h2>
          <Link href="/books">
            <h3>Back to books</h3>
          </Link>

          {/* <Link href="/books/create">Create Book</Link> */}
          <Link href={`/books/${params.genre}/create?genre=${params.genre}`}>
            Create Book
          </Link>
        </div>
      </nav>
      <Suspense fallback={<Loading />}>
        <BooksList genre={params.genre} />
      </Suspense>
    </main>
  );
};

export default Genres;
