import { Bibliography } from "./Bibliography";

export type SearchResultsMessage = {
  searchTerm: string;
  bibliographies: Bibliography[];
};
