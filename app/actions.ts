"use server";

import { revalidatePath } from "next/cache";

import { z } from "zod";
import { fromZodError } from "zod-validation-error";
import { formatCamelCaseString, getGenresFromAPI } from "./lib/helpers";
import { Book, NewBook, NewBookFields } from "./lib/definitions";

const minCharsErrorMsg = (fieldName: string, minChars: string) => {
  return `${formatCamelCaseString(
    fieldName
  )} must contain at least ${minChars} characters`;
};

const maxCharsErrorMsg = (fieldName: string, maxChars: string) => {
  return `${formatCamelCaseString(
    fieldName
  )} must contain at most ${maxChars} characters`;
};

export async function createBook(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  const genres = await getGenresFromAPI();

  const schema = z.object({
    title: z
      .string()
      .min(3, { message: minCharsErrorMsg(NewBookFields.title, "3") })
      .max(100, { message: maxCharsErrorMsg(NewBookFields.title, "100") }),
    description: z
      .string()
      .min(10, { message: minCharsErrorMsg(NewBookFields.description, "10") })
      .max(400, {
        message: maxCharsErrorMsg(NewBookFields.description, "400"),
      }),
    authorName: z
      .string()
      .min(5, { message: minCharsErrorMsg(NewBookFields.authorName, "5") })
      .max(50, { message: maxCharsErrorMsg(NewBookFields.authorName, "50") }),
    publicationDate: z.string().date(),
    price: z.coerce.number().gt(0),
    genre: z.enum(genres),
  });

  const parse = schema.safeParse({
    title: formData.get(NewBookFields.title),
    description: formData.get(NewBookFields.description),
    authorName: formData.get(NewBookFields.authorName),
    publicationDate: formData.get(NewBookFields.publicationDate),
    price: formData.get(NewBookFields.price),
    genre: formData.get(NewBookFields.genre),
  });
  // debugger;
  if (!parse.success) {
    const validationError = fromZodError(parse.error).toString();
    console.log(validationError);
    return { message: validationError };
  }

  const data = parse.data;

  try {
    await fetch(`http://localhost:5000/books/${data.genre}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    revalidatePath(`/books/${data.genre}`);
    return { message: `Added Book ${data.title}` };
  } catch (e) {
    return { message: "Failed to create Book" };
  }
}

// export async function deleteBook(
//   prevState: {
//     message: string;
//   },
//   formData: FormData
// ) {
//   const schema = z.object({
//     id: z.string().min(1),
//     Book: z.string().min(1),
//   });
//   const data = schema.parse({
//     id: formData.get("id"),
//     Book: formData.get("Book"),
//   });

//   try {
//     await sql`
//       DELETE FROM Books
//       WHERE id = ${data.id};
//     `;

//     revalidatePath("/");
//     return { message: `Deleted Book ${data.Book}` };
//   } catch (e) {
//     return { message: "Failed to delete Book" };
//   }
// }
