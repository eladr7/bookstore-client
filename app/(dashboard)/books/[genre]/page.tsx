export const dynamicParams = false;

import { Suspense } from "react";
import { BooksList } from "./BooksList";
import Loading from "../../loading";
import Link from "next/link";
import { ServerSideComponentProp } from "@/app/lib/definitions";
import { formatCamelCaseString, getGenresFromAPI } from "@/app/lib/helpers";

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
        <div className="heading-divider">
          <h1>{formatCamelCaseString(params.genre)}</h1>
          <Link href="/books" className="pt-2">
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
