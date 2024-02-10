import { createRoot } from 'react-dom/client';
import '@mantine/core/styles.css';
import { createTheme, MantineProvider } from '@mantine/core';

const theme = createTheme({
});

console.log('content script');

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
// TODO messageに型をつける
  console.log('content script received message');
  console.log(message);
  console.log(sender);
  console.log(sendResponse);
  sendResponse({ farewell: 'goodbye' });

// TODO ポップアップの表示位置をマウスカーソルの近くにする
// TODO ポップアップを消せるようにする
// TODO ポップアップをタブで切り替えてレスポンスのXMLを表示できるようにする

  const Main = () => {
    return (
      <MantineProvider theme={theme}>
       <div
        style={{
          position: 'absolute',
          width: '100%',
          left: '0px',
          top: '0px',
          zIndex: 2147483550,
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: '10px',
            top: '10px',
            backgroundColor: 'white',
            zIndex: 2147483550,
          }}
        >
            <div>
                <h1>書誌情報一覧（content/index.tsx）</h1>
                <h2>検索文字列: TODO</h2>
                <ul>
                {message.data.bibliographies.map((item, index) => (<li key={index}>{item.author ?? "N/A"}, 『{item.title ?? "N/A"}』, {item.publisher ?? "N/A"}, {item.publicationYear ?? "N/A"}</li>))}
                </ul>
            </div>
        </div>
      </div>
      </MantineProvider>
    );
  };
  
  const container = document.createElement('my-extension-root');
  document.body.after(container);
  createRoot(container).render(
    <Main />
  );
})
