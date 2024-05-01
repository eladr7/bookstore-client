export type Book = {
  id: string;
  title: string;
  description: string;
  authorName: string;
  publicationDate: string;
  price: number;
  genre: string;
};

export type NewBook = Omit<Book, "id" | "publicationDate">;

export enum NewBookFields {
  title = "title",
  description = "description",
  authorName = "authorName",
  publicationDate = "publicationDate",
  price = "price",
  genre = "genre",
}

export interface ServerSideComponentProp<Params, SearchParams = undefined> {
  params: Params;
  searchParams: SearchParams;
}
