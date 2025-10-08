import { Movie } from "./movie";

export interface MovieResponse {
  content: Movie[];
  totalElements: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
}
