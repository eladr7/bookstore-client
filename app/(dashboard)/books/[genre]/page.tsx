import { Suspense } from "react";
import { BooksList } from "./BooksList";
import Loading from "../../loading";
import Link from "next/link";
import { ServerSideComponentProp } from "@/app/definitions";
import { getGenresFromAPI } from "@/app/helpers";

export async function generateStaticParams() {
  const genres = await getGenresFromAPI();

  // [{genre: 'scienceFiction'}, {genre: 'Drama'}, ...]
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
            <h3>Back to the books catalog</h3>
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
