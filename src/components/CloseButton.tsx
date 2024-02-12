import styles from "../index.module.css";
import { X } from "react-feather";

export const CloseButton = ({ onClose }: { onClose: () => void }) => {
  return (
    <button className={styles.bibliographile__close_button} onClick={onClose}>
      <X />
    </button>
  );
};
