import { Bibliography } from "../Bibliography";
import styles from "../index.module.css";

export const BibliographyTable = ({
  bibliographyList,
}: {
  bibliographyList: Bibliography[];
}) => {
  return (
    <table className={styles.bibliographile__dialog__table}>
      <thead>
        <tr>
          <th></th>
          <th>Author</th>
          <th>Title</th>
          <th>Publisher</th>
          <th>Year</th>
        </tr>
      </thead>
      <tbody>
        {bibliographyList.map((bibliography, index) => (
          <tr key={index}>
            <td>
              <button className={styles.bibliographile__copy_button}>
                Copy
              </button>
            </td>
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
