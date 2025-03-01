import { Dialog as HeadlessDialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState, MouseEvent } from "react";
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
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });

  useEffect(() => {
    if (!opened) return;
    setDialogPosition(position);
  }, [opened, position]);

  const handleMouseDown = (e: MouseEvent) => {
    const dialogHeader = (e.target as HTMLElement).closest('.dialog-header');
    if (dialogHeader) {
      setIsDragging(true);
      const rect = dialogHeader.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setDialogPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove as any);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove as any);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);

  return (
    <Transition show={opened} as={Fragment}>
      <HeadlessDialog
        open={opened}
        onClose={onClose}
        className="fixed z-[2147483550]"
        style={{
          left: `${dialogPosition.x}px`,
          top: `${dialogPosition.y}px`,
          cursor: isDragging ? 'grabbing' : 'auto'
        }}
        onMouseDown={handleMouseDown}
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
            <HeadlessDialog.Panel 
              className="bg-white rounded-lg shadow-lg flex flex-col select-none"
            >
              <div className="sticky top-0 bg-white px-4 py-3 border-b border-gray-200 flex-shrink-0 w-full dialog-header cursor-grab hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <svg className="w-6 h-6 text-gray-400 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 6a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM8 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM8 18a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM14 6a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM14 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM14 18a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM20 6a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM20 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM20 18a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" />
                    </svg>
                    <HeadlessDialog.Title className="text-lg font-medium text-gray-900 truncate pr-4">
                      「{searchTerm}」を含む書籍
                    </HeadlessDialog.Title>
                  </div>
                  <CloseButton onClose={onClose} />
                </div>
              </div>
              <div className="px-4 py-3">
                <BibliographyTable bibliographyList={bibliographyList} />
              </div>
            </HeadlessDialog.Panel>
          </div>
        </Transition.Child>
      </HeadlessDialog>
    </Transition>
  );
};
