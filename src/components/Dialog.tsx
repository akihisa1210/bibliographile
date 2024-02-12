import { CSSProperties } from "react";
import { CloseButton } from "./CloseButton";
import { BibliographyTable } from "./BibliographyTable";
import { Bibliography } from "../Bibliography";
import styles from "../index.module.css";

type DialogProps = {
  opened: boolean;
  searchTerm: string;
  bibliographyList: Bibliography[];
  onClose: () => void;
};

export const Dialog = (props: DialogProps) => {
  const { opened, searchTerm, bibliographyList, onClose } = props;

  if (!opened) return null;

  const style: CSSProperties = {
    position: "absolute",
    zIndex: 2147483550,
    backgroundColor: "white",
    border: "1px solid #ccc",
    padding: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  };

  return (
    // ダイアログ内のクリックイベントは親要素に伝播させない
    <div
      className={styles.bibliographile__dialog}
      style={style}
      onClick={(event) => event.stopPropagation()}
    >
      <div className={styles.bibliographile__dialog__header}>
        {" "}
        <span className={styles.bibliographile__dialog__title}>
          「{searchTerm}」を含む書籍
        </span>
        <CloseButton onClose={onClose} />
      </div>
      <BibliographyTable bibliographyList={bibliographyList} />
    </div>
  );
};
