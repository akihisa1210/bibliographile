console.log("background script loaded");

import { Bibliography } from "./Bibliography";
import { SearchResultsMessage } from "./SearchResultsMessage";
import { XMLParser } from "fast-xml-parser";

chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");
  chrome.contextMenus.create({
    id: "bibliographile",
    title: "国会図書館で「%s」が含まれる書籍を検索",
    contexts: ["selection"],
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  console.log("Context menu clicked", info);
  
  const searchTerm = info.selectionText;
  if (!searchTerm) {
    console.log("No text selected");
    return;
  }
  console.log("Searching for:", searchTerm);

  // 最大取得件数
  const MAX_RESULTS = 20;

  // データプロバイダーID
  const DATA_PROVIDER_ID = "iss-ndl-opac";

  const url = `https://ndlsearch.ndl.go.jp/api/opensearch?title=${encodeURIComponent(
    searchTerm
  )}&cnt=${MAX_RESULTS}&dpid=${DATA_PROVIDER_ID}`;

  console.log("Fetching from URL:", url);
  const res = await fetch(url);
  const body = await res.text();

  const xp = new XMLParser();
  console.log("Parsing XML response");
  const parsedXML = xp.parse(body);

  // 検索結果が1つしかない場合は、itemは書誌情報のオブジェクトになる
  // 検索結果が複数ある場合は、itemは書誌情報のオブジェクトの配列になる
  // 後の処理をシンプルにしたいので、検索結果が1つの場合も配列になるようにする
  const result = parsedXML.rss.channel.item;
  const items = Array.isArray(result) ? result : [result];
  console.log("Found items:", items.length);

  // 取得したデータを詰めたデータを作成する
  const bibliographies: Bibliography[] = items.map((item: any) => {
    const author = item.author ?? "N/A";
    const bookTitle = item["dc:title"] ?? "N/A";
    const publisher = item["dc:publisher"] ?? "N/A";
    const publicationYear = item["dc:date"] ?? "N/A";

    return {
      author,
      title: bookTitle,
      publisher,
      publicationYear,
    };
  });

  console.log("Processed bibliographies:", bibliographies.length);

  const data: SearchResultsMessage = {
    searchTerm,
    bibliographies,
    position: { x: 0, y: 0 }
  };

  try {
    if (!tab?.id) {
      throw new Error("Tab ID is not available");
    }

    // コンテンツスクリプトが読み込まれているか確認
    console.log("Checking if content script is ready");
    try {
      // まず接続テストを行う
      await chrome.tabs.sendMessage(tab.id, { type: "PING" });
    } catch (error) {
      console.log("Content script not ready, injecting it");
      
      // マニフェストからファイル名を取得
      const manifest = chrome.runtime.getManifest();
      const contentScripts = manifest.content_scripts?.[0];
      
      if (contentScripts?.js?.[0]) {
        // コンテンツスクリプトを手動で注入
        await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: [contentScripts.js[0]]
        });

        // CSSも注入
        if (contentScripts.css?.[0]) {
          await chrome.scripting.insertCSS({
            target: { tabId: tab.id },
            files: [contentScripts.css[0]]
          });
        }

        // スクリプトが読み込まれるのを少し待つ
        await new Promise(resolve => setTimeout(resolve, 500));
      } else {
        throw new Error("Content script path not found in manifest");
      }
    }

    console.log("Sending message to tab:", tab.id);
    const response = await chrome.tabs.sendMessage(tab.id, {
      type: "BIBLIOGRAPHIES",
      data,
    });
    console.log("Response from content script:", response);
  } catch (error) {
    console.error("Error sending message:", error);
  }
});
