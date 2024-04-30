import { Suspense } from "react";

import Link from "next/link";
import {
  Book,
  ServerSideComponentProp,
  formatCamelCaseString,
} from "@/app/definitions";
import { notFound } from "next/navigation";

const getGenres = async () => {
  const res = await fetch("http://localhost:5000/genres", {
    next: {
      revalidate: 0,
    },
  });

  return res.json();
};

interface BooksCatalogProps {}
const BooksCatalog: React.FC<BooksCatalogProps> = async ({}) => {
  const genres = await getGenres();

  return (
    <main>
      <nav>
        <div className="flex flex-col gap-2">
          <h2>Genres</h2>
          <div
            className="flex justify-center gap-2 divide-y-2 space-y-2"
            style={{
              display: "inline-grid",
              grid: "auto-flow / repeat(auto-fill, minmax(7rem, 1fr))",
            }}
          >
            {genres.map((genre: string, i: number) => (
              <div key={i} className="pt-1">
                <Link href={`/books/${genre}`}>
                  <h3>{formatCamelCaseString(genre)}</h3>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </nav>
    </main>
  );
};

export default BooksCatalog;
