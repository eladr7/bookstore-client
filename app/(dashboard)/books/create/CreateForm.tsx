"use client";

import { Book } from "@/app/lib/definitions";
import { formatCamelCaseString } from "@/app/lib/helpers";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useRef, useState } from "react";

// enum FormInputFields {
//   title = "Title",
//   authorName = "Author name",
//   price = "Price",
//   publicationDate = "Publication date",
//   // description,
//   // genre
// }

type FormInputRole = {
  heading: string;
  type: string;
};

type FromInputMapping = {
  [name: string]: FormInputRole;
};

const FormInputFieldsMap: FromInputMapping = {
  title: { heading: "Title", type: "text" },
  authorName: { heading: "Author name", type: "text" },
  price: { heading: "Price", type: "number" },
  publicationDate: { heading: "Publication date", type: "date" },
};

type NewBook = Omit<Book, "id">;

type InputFields = Omit<NewBook, "description" | "genre">;
const initialData: InputFields = {
  title: "",
  authorName: "",
  publicationDate: "",
  price: 0,
};

interface CreateFromProps {
  genres: string[];
}
const CreateForm: React.FC<CreateFromProps> = ({ genres }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // The only reason I use here useState and not ref - is for code elegancy.
  const [formData, setFormData] = useState<InputFields>(initialData);

  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const genreRef = useRef<HTMLSelectElement>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const newBook: NewBook = {
      ...formData,
      description: descriptionRef.current?.value || "",
      genre: genreRef.current?.value || "",
    };

    const res = await fetch(
      `http://localhost:5000/books/${genreRef.current?.value}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBook),
      }
    );

    if (res.status === 201) {
      router.refresh();
      router.push(`/books/${genreRef.current?.value}`);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData(
      (prev: InputFields) =>
        ({
          ...prev,
          [name]: value,
        } as InputFields)
    );
  };

  return (
    <form onSubmit={handleSubmit} className="create-form w-1/2">
      {Object.entries(FormInputFieldsMap).map(
        ([k, v]: [string, FormInputRole], i: number) => (
          <label key={k}>
            <span>{v.heading}:</span>
            <input
              required
              type={v.type}
              onChange={handleInputChange}
              name={k}
              value={formData[k as keyof InputFields]}
            />
          </label>
        )
      )}

      <label>
        <span>Description:</span>
        <textarea required ref={descriptionRef} />
      </label>
      <label>
        <span>Genre</span>
        <select ref={genreRef}>
          {genres.map((genre: string, i: number) => (
            <option value={genre} key={i}>
              {formatCamelCaseString(genre)}
            </option>
          ))}
        </select>
      </label>
      <button className="btn-primary" disabled={isLoading}>
        {isLoading && <span>Adding...</span>}
        {!isLoading && <span>Add Book</span>}
      </button>
    </form>
  );
};
export default CreateForm;
