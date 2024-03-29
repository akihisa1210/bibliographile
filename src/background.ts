console.log("background.ts");

import { Bibliography } from "./Bibliography";
import { SearchResultsMessage } from "./SearchResultsMessage";
import { XMLParser } from "fast-xml-parser";

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "bibliographile",
    title: "国会図書館で「%s」が含まれる書籍を検索",
    contexts: ["selection"],
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  const searchTerm = info.selectionText;
  if (!searchTerm) {
    return;
  }
  console.log(searchTerm);

  // 最大取得件数
  const MAX_RESULTS = 20;

  // データプロバイダーID
  const DATA_PROVIDER_ID = "iss-ndl-opac";

  const url = `https://ndlsearch.ndl.go.jp/api/opensearch?title=${encodeURIComponent(
    searchTerm
  )}&cnt=${MAX_RESULTS}&dpid=${DATA_PROVIDER_ID}`;

  const res = await fetch(url);
  const body = await res.text();

  const xp = new XMLParser();

  const parsedXML = xp.parse(body);
  console.log(parsedXML);

  // 検索結果が1つしかない場合は、itemは書誌情報のオブジェクトになる
  // 検索結果が複数ある場合は、itemは書誌情報のオブジェクトの配列になる
  // 後の処理をシンプルにしたいので、検索結果が1つの場合も配列になるようにする
  const result = parsedXML.rss.channel.item;
  const items = Array.isArray(result) ? result : [result];

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

  console.log(bibliographies);

  const data: SearchResultsMessage = {
    searchTerm,
    bibliographies,
  };

  try {
    const response = await chrome.tabs.sendMessage(tab.id, {
      type: "BIBLIOGRAPHIES",
      data,
    });
    console.log(response);
  } catch (error) {
    console.error(error);
  }
});
