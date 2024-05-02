import { z } from "zod";
import { NewBookFields } from "./definitions";

export const formatCamelCaseString = (text: string): string => {
  // Break the string into words based on camelCase
  const words = text.replace(/([A-Z])/g, " $1").trim();

  // Capitalize the first letter of each word
  return words
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export const getGenresFromAPI = async () => {
  const res = await fetch("http://localhost:5000/genres", {
    next: {
      revalidate: 60 * 60 * 24 * 30,
    },
  });

  return res.json();
};

export const toNormalDate = (dateString: string) => {
  // dateString example: "2024-04-02T00:00:00.000Z";
  const dateObject = new Date(dateString);

  // Format the date as desired
  const formattedDate = dateObject.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });

  // Output: Apr 2, 2024
  return formattedDate;
};

// Create book form validaion
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
export const createBookSchema = z.object({
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
  // genre: z.enum(genres),
});
export type CreateBookSchema = z.infer<typeof createBookSchema>;
