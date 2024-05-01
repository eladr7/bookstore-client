"use client";

import React from "react";
import { Book } from "../lib/definitions";
// import { useRouter } from "next/navigation";
import { FormSubmitButton } from "./FormSubmitButton";
import { useFormState, useFormStatus } from "react-dom";
import { deleteBook } from "../actions";

const initialState = {
  message: "",
};
// function DeleteButton() {
//   const { pending } = useFormStatus();

//   return (
//     <button type="submit" aria-disabled={pending}>
//       Delete
//     </button>
//   );
// }
interface BookRemoveHandlerProps {
  book: Book;
}

export const BookRemoveHandler: React.FC<BookRemoveHandlerProps> = ({
  book,
}) => {
  // const router = useRouter();
  const [state, formAction] = useFormState(deleteBook, initialState);

  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={book.id} />
      <input type="hidden" name="genre" value={book.genre} />
      {/* <DeleteButton /> */}
      <div className="pill">
        <FormSubmitButton txt="Remove" />
      </div>
      <p aria-live="polite" className="sr-only" role="status">
        {state?.message}
      </p>
    </form>
  );
};
