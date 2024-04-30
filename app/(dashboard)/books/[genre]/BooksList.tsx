import { Book } from "@/app/definitions";
import Link from "next/link";

const getBooks = async (genre: string) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const res = await fetch(`http://localhost:5000/books/${genre}`, {
    next: {
      revalidate: 60,
    },
  });

  return res.json();
};

interface BooksListProps {
  genre: string;
}

export const BooksList: React.FC<BooksListProps> = async ({ genre }) => {
  const books: Book[] = await getBooks(genre);

  return (
    <>
      {books.map((book: Book) => (
        <div key={book.id} className="card my-5">
          <Link href={`/books/${book.id}`}>
            <h3>{book.title}</h3>
            <div className="flex justify-between">
              <p>Written by {book.authorName}, </p>
              <p>Publication date: {book.publicationDate}, </p>
              <p>Price {book.price}.</p>
            </div>
            <p>{book.description.slice(0, 200)}...</p>
          </Link>
        </div>
      ))}

      {books.length === 0 && (
        <p className="text-center">There are no books to show</p>
      )}
    </>
  );
};
