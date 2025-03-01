import { Dialog as HeadlessDialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
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

  return (
    <Transition show={opened} as={Fragment}>
      <HeadlessDialog
        open={opened}
        onClose={onClose}
        className="fixed z-[2147483550]"
        style={{
          left: `${dialogPosition.x}px`,
          top: `${dialogPosition.y}px`,
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className={styles.bibliographile__dialog}>
            <HeadlessDialog.Panel className="w-full max-w-[80vw] max-h-[80vh] overflow-auto bg-white rounded-lg shadow-lg p-4">
              <div className={styles.bibliographile__dialog__header}>
                <HeadlessDialog.Title className={styles.bibliographile__dialog__title}>
                  「{searchTerm}」を含む書籍
                </HeadlessDialog.Title>
                <CloseButton onClose={onClose} />
              </div>
              <BibliographyTable bibliographyList={bibliographyList} />
            </HeadlessDialog.Panel>
          </div>
        </Transition.Child>
      </HeadlessDialog>
    </Transition>
  );
};
