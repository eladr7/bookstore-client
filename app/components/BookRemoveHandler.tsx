"use client";

import React, { FormEvent, useState } from "react";
import { Book } from "../lib/definitions";
import { useRouter } from "next/navigation";

interface BookRemoveHandlerProps {
  book: Book;
}

export const BookRemoveHandler: React.FC<BookRemoveHandlerProps> = ({
  book,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleRemove2 = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setIsLoading(true);
    if (typeof window !== "undefined") {
      const confirmDelete = window.confirm(
        "Are you sure you want to remove this book?"
      );

      if (!confirmDelete) {
        return;
      }
    }

    try {
      const response = await fetch(
        `http://localhost:5000/books/${book.genre}/${book.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to remove book");
      }

      // Handle successful removal, such as navigating to a different page
      console.log("Book removed successfully");

      if (response.status === 201) {
        router.refresh();
        router.push(`/books/${book.genre}`);
      }
    } catch (error: any) {
      console.error("Error removing book:", error.message);
    }
  };

  const handleRemove = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (typeof window !== "undefined") {
      const confirmDelete = window.confirm(
        "Are you sure you want to remove this book?"
      );

      if (!confirmDelete) {
        return;
      }
    }

    try {
      const response = await fetch(
        `http://localhost:5000/books/${book.genre}/${book.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to remove book");
      }

      // Handle successful removal, such as navigating to a different page
      console.log("Book removed successfully");

      if (response.status === 201) {
        router.refresh();
        router.push(`/books/${book.genre}`);
      }
    } catch (error: any) {
      console.error("Error removing book:", error.message);
    }
  };
  return (
    <form onSubmit={handleRemove}>
      <button
        className="btn-primary pill"
        disabled={isLoading}
        onClick={handleRemove2}
      >
        Remove
      </button>
    </form>
  );
};
