export const dynamicParams = false;

import { ServerSideComponentProp } from "@/app/definitions";

import { Book } from "@/app/definitions";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  // [{id: '1', genre: "..."}, {id: '2', genre: "..."}, ...]
  const res = await fetch("http://localhost:5000/books");
  const books = await res.json();

  return books.map((book: Book) => ({ id: book.id, genre: book.genre }));
}

const getBook = async (genre: string, id: string) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

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

const BookDetails: React.FC<
  ServerSideComponentProp<{ id: string; genre: string }>
> = async ({ params }) => {
  const book: Book = await getBook(params.genre, params.id);
  return (
    <main>
      <nav>
        <h2>Book details</h2>
      </nav>

      <div className="card">
        <h3>{book.title}</h3>
        {/* <small>Created by {book.user_email}</small>
        <p>{book.body}</p> */}
      </div>
    </main>
  );
};

export default BookDetails;
