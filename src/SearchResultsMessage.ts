import { Bibliography } from "./Bibliography";

export type Position = {
  x: number;
  y: number;
};

export type SearchResultsMessage = {
  searchTerm: string;
  bibliographies: Bibliography[];
  position: Position;
};
