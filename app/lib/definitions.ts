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
