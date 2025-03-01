import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

type CopyButtonProps = {
  text: string;
};

export const CopyButton = ({ text }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="rounded-full p-1 hover:bg-gray-100 transition-colors duration-200"
      aria-label={copied ? "コピーしました" : "書誌情報をコピー"}
    >
      <DocumentDuplicateIcon 
        className={`h-5 w-5 ${copied ? "text-green-500" : "text-gray-500"}`} 
      />
    </button>
  );
};
