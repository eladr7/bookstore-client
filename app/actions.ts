"use server";

import { revalidatePath } from "next/cache";

import { z } from "zod";
import { fromZodError } from "zod-validation-error";
import { createBookSchema, getGenresFromAPI } from "./lib/helpers";
import { BookAppendedMsg, BookRemovedMsg } from "./lib/definitions";

export async function createBook(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  const genres = await getGenresFromAPI();
  const schema = createBookSchema.extend({ genre: z.enum(genres) });

  const dataToParse: Record<string, string> = Array.from(
    formData.entries()
  ).reduce((acc: Record<string, string>, [key, value]) => {
    console.log(key, value);
    acc[key] = value.toString();
    return acc;
  }, {});

  const parse = schema.safeParse({
    ...dataToParse,
  });

  if (!parse.success) {
    const validationError = fromZodError(parse.error).toString();
    console.log(validationError);
    return { message: validationError };
  }

  const data = parse.data;

  try {
    const response = await fetch(`http://localhost:5000/books/${data.genre}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const parsed = await response.json();
    if (!response.ok) {
      console.error("Failed to create: ", parsed.message);
      return { message: parsed.message };
    }

    revalidatePath(`/books/${data.genre}`);
    return { message: `${BookAppendedMsg} ${data.title}` };
  } catch (e) {
    return { message: "Failed to create Book" };
  }
}

export async function deleteBook(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  const schema = z.object({
    id: z.string().min(1),
    genre: z.string().min(1),
  });
  const data = schema.parse({
    id: formData.get("id"),
    genre: formData.get("genre"),
  });

  try {
    const response = await fetch(
      `http://localhost:5000/books/${data.genre}/${data.id}`,
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

    revalidatePath(`/books/${data.genre}`);
    console.log(BookRemovedMsg);
    return { message: BookRemovedMsg };
  } catch (e) {
    return { message: "Failed to delete Book" };
  }
}
