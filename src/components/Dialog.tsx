import { CSSProperties, useEffect, useState } from "react";
import { CloseButton } from "./CloseButton";
import { BibliographyTable } from "./BibliographyTable";
import { Bibliography } from "../Bibliography";
import { Position } from "../SearchResultsMessage";
import styles from "../index.module.css";

type DialogProps = {
  opened: boolean;
  searchTerm: string;
  bibliographyList: Bibliography[];
  position: Position;
  onClose: () => void;
};

export const Dialog = (props: DialogProps) => {
  const { opened, searchTerm, bibliographyList, position, onClose } = props;
  const [dialogPosition, setDialogPosition] = useState<Position>(position);

  console.log("Dialog render", { opened, searchTerm, position, dialogPosition });

  useEffect(() => {
    if (!opened) return;

    // ウィンドウのサイズを取得
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // ダイアログの仮のサイズ（実際のサイズは描画後に分かる）
    const estimatedWidth = Math.min(800, windowWidth * 0.8);  // 最大幅800pxまたはウィンドウ幅の80%
    const estimatedHeight = Math.min(600, windowHeight * 0.8); // 最大高さ600pxまたはウィンドウ高さの80%

    // 画面内に収まるように位置を調整
    const x = Math.min(
      position.x,
      windowWidth - estimatedWidth - 20  // 20pxはマージン
    );
    const y = Math.min(
      position.y,
      windowHeight - estimatedHeight - 20  // 20pxはマージン
    );

    console.log("Adjusting dialog position", { x, y, windowWidth, windowHeight });
    setDialogPosition({ x, y });
  }, [opened, position]);

  if (!opened) return null;

  const style: CSSProperties = {
    position: "fixed",
    zIndex: 2147483550,
    backgroundColor: "white",
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "16px",
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
    left: `${dialogPosition.x}px`,
    top: `${dialogPosition.y}px`,
    maxWidth: "80vw",
    maxHeight: "80vh",
    overflow: "auto",
  };

  console.log("Dialog style", style);

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
