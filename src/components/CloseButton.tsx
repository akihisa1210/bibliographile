import styles from "../index.module.css";

export const CloseButton = ({ onClose }: { onClose: () => void }) => {
  return (
    <button className={styles.bibliographile__close_button} onClick={onClose}>
      &times;
    </button>
  );
};
