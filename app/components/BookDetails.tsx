import React from "react";
import { Book } from "../lib/definitions";
import { toNormalDate } from "../lib/helpers";
import { BookRemoveHandler } from "./BookRemoveHandler";
import Link from "next/link";

interface BookDetailsProps {
  book: Book;
}

export const BookDetails: React.FC<BookDetailsProps> = ({ book }) => {
  return (
    <div className="card my-5 divide-y-2">
      <Link href={`/books/${book.genre}/${book.id}`} key={book.id}>
        <div>
          <h2>{book.title}</h2>
          <p>{book.description}</p>
          <BookRemoveHandler book={book} />
        </div>
      </Link>
      <div className="flex gap-2 flex-center divide-x-2 divide-blue-200 divide-opacity-85">
        <p>
          <b>Written by</b> {book.authorName}
        </p>
        <p className="pl-2">
          <b>Publication date:</b> {toNormalDate(book.publicationDate)}
        </p>
        <p className="pl-2">
          <b>Price</b> {book.price}$
        </p>
      </div>
    </div>
  );
};
