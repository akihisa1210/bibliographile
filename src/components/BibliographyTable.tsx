import { Bibliography } from "../Bibliography";

export const BibliographyTable = ({
  bibliographyList,
}: {
  bibliographyList: Bibliography[];
}) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Author</th>
          <th>Title</th>
          <th>Publisher</th>
          <th>Year</th>
        </tr>
      </thead>
      <tbody>
        {bibliographyList.map((bibliography, index) => (
          <tr key={index}>
            <td>{bibliography.author}</td>
            <td>『{bibliography.title}』</td>
            <td>{bibliography.publisher}</td>
            <td>{bibliography.publicationYear}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
