import type { Story } from "@ladle/react";
import { BibliographyTable } from "./BibliographyTable";
import { Bibliography } from "../Bibliography";

const bibliographyList: Bibliography[] = [
  {
    author: "Author1",
    title: "Title1",
    publisher: "Publisher1",
    publicationYear: "2021",
  },
  {
    author: "Author2",
    title: "Title2",
    publisher: "Publisher2",
    publicationYear: "2022",
  },
  {
    author: "Author3",
    title: "Title3",
    publisher: "Publisher3",
    publicationYear: "2023",
  },
];

export const Empty: Story = () => (
  <BibliographyTable bibliographyList={bibliographyList} />
);
