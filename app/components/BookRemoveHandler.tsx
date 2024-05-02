"use client";

import React, { FormEvent, useRef } from "react";
import { Book, BookRemovedMsg } from "../lib/definitions";
import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";
import { deleteBook } from "../actions";
import { FormSubmitButton } from "./FormSubmitButton";

interface BookRemoveHandlerProps {
  book: Book;
}

export const BookRemoveHandler: React.FC<BookRemoveHandlerProps> = ({
  book,
}) => {
  const router = useRouter();
  const [state, formAction] = useFormState(deleteBook, {
    message: "",
  });

  const formRef = useRef<HTMLFormElement>(null);

  if (state.message.includes(BookRemovedMsg)) {
    router.refresh();
    router.push(`/books/${book.genre}`);
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (typeof window !== "undefined") {
      const confirmDelete = window.confirm(
        "Are you sure you want to remove this book?"
      );

      if (!confirmDelete) {
        return;
      }
    }

    formAction(new FormData(formRef.current!));
  };

  return (
    <form action={formAction} onSubmit={handleSubmit} ref={formRef}>
      <input type="hidden" name="id" value={book.id} />
      <input type="hidden" name="genre" value={book.genre} />
      <div className="pill">
        <FormSubmitButton txt="Remove" />
      </div>
      <p aria-live="polite" className="sr-only" role="status">
        {state?.message}
      </p>
    </form>
  );
};
