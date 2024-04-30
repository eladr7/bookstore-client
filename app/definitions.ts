export type Book = {
  id: string;
  title: string;
  description: string;
  authorName: string;
  publicationDate: string;
  price: number;
  genre: string;
};

export interface ServerSideComponentProp<Params, SearchParams = undefined> {
  params: Params;
  searchParams: SearchParams;
}

export const formatCamelCaseString = (text: string): string => {
  // Break the string into words based on camelCase
  const words = text.replace(/([A-Z])/g, " $1").trim();

  // Capitalize the first letter of each word
  return words
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};
