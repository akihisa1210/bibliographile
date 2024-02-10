import { createRoot } from 'react-dom/client';
import '@mantine/core/styles.css';
import { createTheme, MantineProvider, Box, List } from '@mantine/core';

const theme = createTheme({
});

console.log('content script');

let mouseX  = 0;
let mouseY  = 0;
document.addEventListener('contextmenu', (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;
}, true);

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
// TODO messageに型をつける
  console.log('content script received message');
  console.log(message);
  console.log(sender);
  console.log(sendResponse);
  sendResponse({ farewell: 'goodbye' });

// TODO ポップアップを消せるようにする
// TODO ポップアップをタブで切り替えてレスポンスのXMLを表示できるようにする

  const Main = () => {
    return (
      <MantineProvider theme={theme}>
       <div
        style={{
          position: 'absolute',
          width: '100%',
          left: `${mouseX}px`,
          top: `${mouseY}px`,
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
          <Box
            style={(theme) => ({
              backgroundColor: 'white',
              textAlign: 'left',
              padding: theme.spacing.md,
              borderRadius: theme.radius.md,
              maxWidth: 500,
              boxShadow: '0 0 10px rgba(0, 0, 0, .3)',
              zIndex: 2147483550
            })}
            component='div'
            >
            <div>
                <h1>書誌情報一覧（content/index.tsx）</h1>
                <h2>検索文字列: TODO</h2>
                <List>
                {message.data.bibliographies.map((item, index) => (<List.Item key={index}>{item.author ?? "N/A"}, 『{item.title ?? "N/A"}』, {item.publisher ?? "N/A"}, {item.publicationYear ?? "N/A"}</List.Item>))}
                </List>
            </div>
            </Box>
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
