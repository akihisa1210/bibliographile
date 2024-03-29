import { createRoot } from "react-dom/client";
import { useState, useEffect } from "react";
import { App } from "../components/App";
import { Dialog } from "../components/Dialog";
import { SearchResultsMessage } from "../SearchResultsMessage";

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

chrome.runtime.onMessage.addListener(function (
  message: { data: SearchResultsMessage },
  sender,
  sendResponse
) {
  console.log("content script received message");
  console.log(message);
  console.log(sender);
  console.log(sendResponse);
  sendResponse({ farewell: "goodbye" });

  const { searchTerm, bibliographies } = message.data;

  // TODO ポップアップをタブで切り替えてレスポンスのXMLを表示できるようにする

  const Main = () => {
    const [opened, setOpened] = useState(true);

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
      <App position={{ x: `${mouseX}px`, y: `${mouseY}px` }}>
        <Dialog
          opened={opened}
          searchTerm={searchTerm}
          bibliographyList={bibliographies}
          onClose={handlePageClick}
        />
      </App>
    );
  };

  const container = document.createElement("bibliographile-extension-root");
  document.body.after(container);
  createRoot(container).render(<Main />);
});
