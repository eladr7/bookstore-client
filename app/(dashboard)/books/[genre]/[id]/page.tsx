export const dynamicParams = false;

import { BookDetails } from "@/app/components/BookDetails";
import { Book, ServerSideComponentProp } from "@/app/lib/definitions";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  // [{id: '1', genre: "..."}, {id: '2', genre: "..."}, ...]
  const res = await fetch("http://localhost:5000/books");
  const books = await res.json();

  return books.map((book: Book) => ({ id: book.id, genre: book.genre }));
}

const getBook = async (genre: string, id: string) => {
  // await new Promise((resolve) => setTimeout(resolve, 2000));

  const res = await fetch(`http://localhost:5000/books/${genre}/${id}`, {
    next: {
      revalidate: 60,
    },
  });

  if (!res.status) {
    notFound();
  }

  return res.json();
};

const BookCard: React.FC<
  ServerSideComponentProp<{ id: string; genre: string }>
> = async ({ params }) => {
  const book: Book = await getBook(params.genre, params.id);
  return (
    <main>
      <nav>
        <div className="heading-divider">
          <h1>Book details [Genre: {book.genre}]</h1>
          <Link href={`/books/${book.genre}`} className="pt-2">
            <h3>
              Back to the{" "}
              <b>
                {" "}
                <big>{book.genre}</big>
              </b>{" "}
              catalog
            </h3>
          </Link>
        </div>
      </nav>

      <BookDetails book={book} />
    </main>
  );
};

export default BookCard;
