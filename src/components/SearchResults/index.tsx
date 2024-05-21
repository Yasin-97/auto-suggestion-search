import { ServiceType } from "../ServiceSearch";

type SearchResultsProps = {
  results: ServiceType[];
  containerClassName: string;
};

function SearchResults({ results, containerClassName }: SearchResultsProps) {
  return (
    <ul className={containerClassName}>
      {results.map(({ name }) => (
        <li
          key={name}
          className="border-b border-b-[#F5F5F5] p-3 cursor-pointer hover:bg-[#E5F1FF] list-none select-none"
        >
          {name}
        </li>
      ))}
    </ul>
  );
}

export default SearchResults;
