import { Bibliography } from "../Bibliography";
import { CopyButton } from "./CopyButton";

export const BibliographyTable = ({
  bibliographyList,
}: {
  bibliographyList: Bibliography[];
}) => {
  // 最初の10件のみを表示
  const displayList = bibliographyList.slice(0, 10);

  const formatBibliography = (bibliography: Bibliography): string => {
    return `${bibliography.author}『${bibliography.title}』${bibliography.publisher}、${bibliography.publicationYear}年`;
  };

  const formatAuthorForDisplay = (author: string | undefined): string => {
    if (!author) return "著者不明";
    
    // カンマまたは区切り文字で著者を分割
    const authors = author.split(/[,、]/);
    
    // 最初の著者名を取得
    const firstAuthor = authors[0].trim();
    
    // 著者名が1人で長い場合は省略
    if (authors.length === 1 && firstAuthor.length > 8) {
      return `${firstAuthor.slice(0, 8)}...`;
    }
    
    // 複数著者の場合
    if (authors.length > 1) {
      // 最初の著者名が長い場合は省略
      if (firstAuthor.length > 8) {
        return `${firstAuthor.slice(0, 8)}... 他`;
      }
      return `${firstAuthor} 他`;
    }
    
    return firstAuthor;
  };

  const formatTitleForDisplay = (title: string | undefined): string => {
    if (!title) return "タイトル不明";
    
    // 15文字を超えるタイトルは省略
    if (title.length > 15) {
      return `${title.slice(0, 15)}...`;
    }
    
    return title;
  };

  const formatPublisherForDisplay = (publisher: string | undefined): string => {
    if (!publisher) return "出版社不明";
    
    // 6文字を超える出版社名は省略
    if (publisher.length > 6) {
      return `${publisher.slice(0, 6)}...`;
    }
    
    return publisher;
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="w-8 px-2 py-2"></th>
            <th scope="col" className="w-32 px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              著者
            </th>
            <th scope="col" className="w-64 px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              タイトル
            </th>
            <th scope="col" className="w-28 px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              出版社
            </th>
            <th scope="col" className="w-16 px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              出版年
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {displayList.map((bibliography, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-2 py-2 whitespace-nowrap">
                <CopyButton text={formatBibliography(bibliography)} />
              </td>
              <td className="px-2 py-2 text-sm text-gray-900">
                <div className="truncate max-w-[128px]" title={bibliography.author}>
                  {formatAuthorForDisplay(bibliography.author)}
                </div>
              </td>
              <td className="px-2 py-2 text-sm text-gray-900">
                <div className="truncate max-w-[256px]" title={bibliography.title}>
                  『{formatTitleForDisplay(bibliography.title)}』
                </div>
              </td>
              <td className="px-2 py-2 text-sm text-gray-900">
                <div className="truncate max-w-[112px]" title={bibliography.publisher}>
                  {formatPublisherForDisplay(bibliography.publisher)}
                </div>
              </td>
              <td className="px-2 py-2 text-sm text-gray-900 whitespace-nowrap">
                {bibliography.publicationYear}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {bibliographyList.length > 10 && (
        <div className="text-sm text-gray-500 mt-2 px-2">
          ※ 最初の10件のみ表示しています（全{bibliographyList.length}件）
        </div>
      )}
    </div>
  );
};
