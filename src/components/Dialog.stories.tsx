import type { Story } from "@ladle/react";
import { Dialog } from "./Dialog";
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

const bigBibliography: Bibliography = {
  author: "ああああああ, ああああああ",
  title:
    "ああああああああああああああああああああああああああああああああああああ",
  publisher: "ああああああ",
  publicationYear: "2021",
};

export const OpenedDialog: Story = () => (
  <Dialog
    opened={true}
    searchTerm="SearchedTitle"
    bibliographyList={bibliographyList}
    onClose={() => {}}
  />
);

export const BigDialog: Story = () => (
  <Dialog
    opened={true}
    searchTerm="SearchedTitle"
    bibliographyList={Array(20).fill(bigBibliography)}
    onClose={() => {}}
  />
);
