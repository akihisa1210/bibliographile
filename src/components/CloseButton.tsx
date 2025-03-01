import { XMarkIcon } from "@heroicons/react/24/outline";

export const CloseButton = ({ onClose }: { onClose: () => void }) => {
  return (
    <button
      onClick={onClose}
      className="rounded-full p-1 hover:bg-gray-100 transition-colors duration-200"
      aria-label="閉じる"
    >
      <XMarkIcon className="h-5 w-5 text-gray-500" />
    </button>
  );
};
