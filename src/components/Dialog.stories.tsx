import type { Story } from "@ladle/react";
import { Dialog } from "./Dialog";

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

export const OpenedDialog: Story = () => (
  <Dialog
    opened={true}
    searchTerm="SearchedTitle"
    bibliographyList={bibliographyList}
    onClose={() => {}}
  />
);
