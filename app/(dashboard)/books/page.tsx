import { formatCamelCaseString, getGenresFromAPI } from "@/app/lib/helpers";
import Link from "next/link";

interface BooksCatalogProps {}
const BooksCatalog: React.FC<BooksCatalogProps> = async ({}) => {
  const genres = await getGenresFromAPI();

  return (
    <main>
      <nav>
        <div className="flex flex-col gap-2">
          <h2>Genres</h2>
          <div
            className="heading-divider space-y-2"
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
