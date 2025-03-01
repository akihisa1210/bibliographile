import { createRoot } from "react-dom/client";
import { useState, useEffect } from "react";
import { Dialog } from "../components/Dialog";
import { SearchResultsMessage } from "../SearchResultsMessage";

console.log("content script loaded");

// マウス位置をグローバルに管理
const mousePosition = {
  x: 0,
  y: 0,
};

// 右クリック時のマウス位置を保存
document.addEventListener("contextmenu", (event) => {
  console.log("contextmenu event", event.clientX, event.clientY);
  mousePosition.x = event.clientX;
  mousePosition.y = event.clientY;
}, true);

// 既存のコンテナを削除（再注入時の重複を防ぐ）
const cleanup = () => {
  const existingContainer = document.getElementById("bibliographile-extension-root");
  if (existingContainer) {
    existingContainer.remove();
  }
};

// 初期化時にクリーンアップを実行
cleanup();

chrome.runtime.onMessage.addListener(function (
  message: { type: string; data?: SearchResultsMessage },
  _sender,
  sendResponse
) {
  console.log("Message received:", message);

  // PINGメッセージの処理
  if (message.type === "PING") {
    console.log("Received PING message");
    sendResponse({ status: "ready" });
    return true; // 非同期レスポンスを示す
  }

  if (message.type !== "BIBLIOGRAPHIES" || !message.data) {
    console.log("Not a BIBLIOGRAPHIES message");
    return;
  }

  // 既存のダイアログを削除
  cleanup();

  console.log("Current mouse position:", mousePosition);
  const { searchTerm, bibliographies } = message.data;
  console.log("Creating dialog with search term:", searchTerm);

  const Main = () => {
    const [opened, setOpened] = useState(true);

    const handlePageClick = () => {
      setOpened(false);
    };

    useEffect(() => {
      console.log("Dialog mounted with position:", mousePosition);
      const handlePageClick = () => {
        if (opened) {
          setOpened(false);
          // ダイアログを閉じた後にコンテナを削除
          cleanup();
        }
      };

      document.addEventListener("click", handlePageClick);

      return () => {
        document.removeEventListener("click", handlePageClick);
      };
    }, [opened]);

    // スクロール位置を考慮した表示位置の計算
    const displayPosition = {
      x: mousePosition.x,
      y: mousePosition.y,
    };

    console.log("Rendering dialog at position:", displayPosition);

    return (
      <Dialog
        opened={opened}
        searchTerm={searchTerm}
        bibliographyList={bibliographies}
        position={displayPosition}
        onClose={handlePageClick}
      />
    );
  };

  try {
    console.log("Creating container element");
    const container = document.createElement("div");
    container.id = "bibliographile-extension-root";
    document.body.appendChild(container);
    console.log("Container added to body");
    
    createRoot(container).render(<Main />);
    console.log("Dialog rendered");
  } catch (error) {
    console.error("Error rendering dialog:", error);
  }

  // メッセージ受信を確認
  sendResponse({ status: "success" });
  return true; // 非同期レスポンスを示す
});
