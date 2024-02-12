import styles from "../index.module.css";
import { Copy } from "react-feather";

export const CopyButton = ({ onCopy }: { onCopy: () => void }) => {
  return (
    <button className={styles.bibliographile__copy_button} onClick={onCopy}>
      <Copy />
    </button>
  );
};
