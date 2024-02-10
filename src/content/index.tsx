import { createRoot } from "react-dom/client";
import { CSSProperties, useState, useEffect } from "react";

type MyDialogProps = {
  opened: boolean;
  position: { x: string; y: string };
  onClose: () => void;
  children: React.ReactNode;
};

const MyDialog = (props: MyDialogProps) => {
  const { opened, position, onClose, children } = props;

  if (!opened) return null;

  const style: CSSProperties = {
    position: "absolute",
    left: position.x,
    top: position.y,
    zIndex: 2147483550,
    backgroundColor: "white",
    border: "1px solid #ccc",
    padding: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  };

  return (
    // ダイアログ内のクリックイベントは親要素に伝播させない
    <div style={style} onClick={(event) => event.stopPropagation()}>
      {children}
      <button onClick={onClose}>Close</button>
    </div>
  );
};

console.log("content script");

let mouseX = 0;
let mouseY = 0;
document.addEventListener(
  "contextmenu",
  (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
  },
  true
);

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  // TODO messageに型をつける
  console.log("content script received message");
  console.log(message);
  console.log(sender);
  console.log(sendResponse);
  sendResponse({ farewell: "goodbye" });

  // TODO ポップアップを消せるようにする
  // TODO ポップアップをタブで切り替えてレスポンスのXMLを表示できるようにする

  const Main = () => {
    const [opened, setOpened] = useState(true);
    // const [position, setPosition] = useState({ x: `${mouseX}px`, y: `${mouseY}px` });

    const handlePageClick = () => {
      setOpened(false);
    };

    const close = () => setOpened(false);

    useEffect(() => {
      const handlePageClick = () => {
        if (opened) {
          close();
        }
      };

      document.addEventListener("click", handlePageClick);

      return () => {
        document.removeEventListener("click", handlePageClick);
      };
    }, [opened]);

    return (
      <div>
        {opened && (
          <MyDialog
            opened={opened}
            position={{ x: `${mouseX}px`, y: `${mouseY}px` }}
            onClose={close}
          >
            <div>
              <h1>書誌情報一覧（content/index.tsx）</h1>
              <h2>検索文字列: TODO</h2>
              <ul>
                {message.data.bibliographies.map((item, index) => (
                  <li key={index}>
                    {item.author ?? "N/A"}, 『{item.title ?? "N/A"}』,{" "}
                    {item.publisher ?? "N/A"}, {item.publicationYear ?? "N/A"}
                  </li>
                ))}
              </ul>
            </div>
          </MyDialog>
        )}
      </div>
    );
  };

  const container = document.createElement("my-extension-root");
  document.body.after(container);
  createRoot(container).render(<Main />);
});
