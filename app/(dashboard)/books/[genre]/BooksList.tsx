import { BookDetails } from "@/app/components/BookDetails";
import { Book } from "@/app/lib/definitions";

const getBooks = async (genre: string) => {
  // await new Promise((resolve) => setTimeout(resolve, 2000));

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
      {books.map((book: Book) => {
        if (book.description.length > 200) {
          book.description = book.description.slice(0, 200) + "...";
        }

        return <BookDetails book={book} key={book.id} />;
      })}

      {books.length === 0 && (
        <p className="text-center">There are no books to show</p>
      )}
    </>
  );
};
