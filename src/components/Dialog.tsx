import { CSSProperties } from "react";
import { CloseButton } from "./CloseButton";
import { BibliographyTable } from "./BibliographyTable";
import { Bibliography } from "../Bibliography";

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
    <div style={style} onClick={(event) => event.stopPropagation()}>
      {searchTerm}
      <CloseButton onClose={onClose} />
      <BibliographyTable bibliographyList={bibliographyList} />
    </div>
  );
};
