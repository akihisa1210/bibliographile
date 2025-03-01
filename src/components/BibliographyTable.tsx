import { Bibliography } from "../Bibliography";
import { CopyButton } from "./CopyButton";

export const BibliographyTable = ({
  bibliographyList,
}: {
  bibliographyList: Bibliography[];
}) => {
  const formatBibliography = (bibliography: Bibliography): string => {
    return `${bibliography.author}『${bibliography.title}』${bibliography.publisher}、${bibliography.publicationYear}年`;
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="w-12 px-2 py-3"></th>
            <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              著者
            </th>
            <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              タイトル
            </th>
            <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              出版社
            </th>
            <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              出版年
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {bibliographyList.map((bibliography, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-2 py-4 whitespace-nowrap">
                <CopyButton text={formatBibliography(bibliography)} />
              </td>
              <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                {bibliography.author}
              </td>
              <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                『{bibliography.title}』
              </td>
              <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                {bibliography.publisher}
              </td>
              <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                {bibliography.publicationYear}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
