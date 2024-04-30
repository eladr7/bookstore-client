"use client";

import { Book } from "@/app/definitions";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

enum FormInputFields {
  title = "Title",
  authorName = "Author name",
  price = "Price",
  publicationDate = "Publication date",
  // description,
  // genre
}

type NewBook = Omit<Book, "id">;
const initialData: NewBook = {
  genre: "",
  title: "",
  authorName: "",
  publicationDate: "",
  price: 0,
  description: "",
};

export default function CreateForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<NewBook>(initialData);

  // Assuming the URL is something like "http://example.com/?key=value"
  const searchParams = new URLSearchParams(window.location.search);
  const genre = searchParams.get("genre");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const newBook: NewBook = {
      title: "gfh",
      description: "blat book1",
      authorName: "blat author1",
      genre: "drama",
      price: 324,
      publicationDate: "2022-04-30T00:00:00.000Z",
    };

    const res = await fetch(`http://localhost:5000/books/${genre}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBook),
    });

    if (res.status === 201) {
      router.refresh();
      router.push(`/books/${genre}`);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData(
      (prev: NewBook) =>
        ({
          ...prev,
          [name]: value,
        } as NewBook)
    );
  };

  return (
    <form onSubmit={handleSubmit} className="w-1/2">
      {Object.entries(FormInputFields).map(([k, v], i: number) => (
        <label key={k}>
          <span>{v}:</span>
          <input
            required
            type="text"
            onChange={handleChange}
            name={k}
            value={formData[k as keyof NewBook]}
          />
        </label>
      ))}

      <label>
        <span>Body:</span>
        {/* <textarea
          required
          onChange={(e) => setBody(e.target.value)}
          value={body}
        /> */}
      </label>
      <label>
        <span>genre</span>
        <select value={genre || ""}>
          <option value={genre || ""}>{genre}</option>
        </select>
      </label>
      <button className="btn-primary" disabled={isLoading}>
        {isLoading && <span>Adding...</span>}
        {!isLoading && <span>Add Book</span>}
      </button>
    </form>
  );
}
