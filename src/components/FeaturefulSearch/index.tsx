import { FormEvent, useEffect, useState } from "react";
import FakeSpan from "../FakeSpan";
import { ServiceType } from "../ServiceSearch";
import SearchResults from "../SearchResults";

export type FeaturefulSearchInputProps = {
  services: ServiceType[];
};
function FeaturefulSearch({ services }: FeaturefulSearchInputProps) {
  const [serviceSearchInputValue, setServiceSearchInputValue] =
    useState<string>("");

  const [filteredServices, setFilteredServices] = useState<ServiceType[]>([]);

  const [fakeSpanDomWidth, setFakeSpanDomWidth] = useState("100%");

  const [suggestionInputPlaceholder, setSuggestionInputPlaceholder] =
    useState("");

  useEffect(() => {
    const results = services.filter((s) =>
      s.name.includes(serviceSearchInputValue)
    );

    if (serviceSearchInputValue.trim() !== "") {
      setFilteredServices(results);
    } else {
      setFilteredServices([]);
    }
  }, [serviceSearchInputValue]);

  useEffect(() => {
    const newPlaceholder = isInputValueSubstrinOfFirstSearchItem
      ? firstSearchItemText
      : "";
    setSuggestionInputPlaceholder(newPlaceholder);
  }, [serviceSearchInputValue]); // removed serviceSearchResults as it was reference type value

  const handleSearchInputChange = (e: FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setServiceSearchInputValue(value);
  };

  const firstSearchItemText = filteredServices[0]?.name
    ? filteredServices[0].name
    : "";

  const isInputValueSubstrinOfFirstSearchItem =
    serviceSearchInputValue ===
    firstSearchItemText.substring(0, serviceSearchInputValue.length);

  const shouldInputExpand =
    fakeSpanDomWidth === "0px" || suggestionInputPlaceholder.length === 0;

  return (
    <div className="relative flex items-center w-full shadow-sm rounded-md">
      <div className="flex flex-col justify-center w-full relative">
        <div className="flex items-center p-3 border-gray-200 border rounded-lg h-12">
          <div className="flex w-full">
            <div className="flex justify-between items-center w-full relative overflow-hidden">
              <input
                type="text"
                className="absolute outline-none text-gray-700"
                style={{ width: shouldInputExpand ? "100%" : fakeSpanDomWidth }}
                value={serviceSearchInputValue}
                onChange={handleSearchInputChange}
                placeholder="به چه خدمتی نیاز دارید؟"
              />

              <FakeSpan
                textValue={serviceSearchInputValue}
                setFakeSpanDomWidth={setFakeSpanDomWidth}
              />

              <input
                placeholder={suggestionInputPlaceholder}
                className="w-full outline-none"
              />
            </div>
          </div>
        </div>
        <span className="absolute left-0 self-center h-9 w-0 border-r-[1px] border-gray-200" />
      </div>

      <SearchResults
        containerClassName="bg-white overflow-auto z-10 mt-12 top-0 max-h-72 absolute w-full border border-[#EAECED] rounded-b-md shadow-sm scrollbar-minimal"
        results={filteredServices}
      />
    </div>
  );
}

export default FeaturefulSearch;
