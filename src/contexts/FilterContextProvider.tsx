import { createContext, ReactNode, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import useQueryParam from "@/lib/hooks";

type FilterContextProviderProps = {
  children: ReactNode;
};

type TFilterContext = {
  searchText: string;
  debouncedSearchText: string;
  selectedFromDate: Date | undefined;
  selectedCategory: string;
  selectedSource: string | null;
  handleChangeSearchText: (value: string) => void;
  handleChangeFromDate: (value: Date | undefined) => void;
  handleChangeCategory: (value: string) => void;
  handleChangeSource: (value: string) => void;
};

export const FilterContext = createContext<TFilterContext | null>(null);

export default function FilterContextProvider({
  children,
}: FilterContextProviderProps) {
  const [searchQueryParam, setSearchQueryParam] = useQueryParam("q", "");
  const [categoryQueryParam, setCategoryQueryParam] = useQueryParam(
    "category",
    ""
  );
  const [sourceQueryParam, setSourceQueryParam] = useQueryParam("source", "");
  const [searchText, setSearchText] = useState<string>(searchQueryParam || "");
  const [selectedFromDate, setSelectedFromDate] = useState<Date>();
  const [selectedCategory, setSelectedCategory] = useState(categoryQueryParam);
  const [selectedSource, setSelectedSource] = useState(sourceQueryParam);

  const handleChangeSearchText = (newSearchText: string) => {
    setSearchQueryParam(newSearchText);
    setSearchText(newSearchText);
  };

  const handleChangeFromDate = (newValue: Date | undefined) => {
    setSelectedFromDate(newValue);
  };
  const handleChangeCategory = (newValue: string) => {
    setCategoryQueryParam(newValue);
    setSelectedCategory(newValue);
    setSourceQueryParam("");
    setSelectedSource("");
  };
  const handleChangeSource = (newValue: string) => {
    setSourceQueryParam(newValue);
    setSelectedSource(newValue);
    setCategoryQueryParam("");
    setSelectedCategory("");
  };

  const debouncedSearchText = useDebounce(searchText, 400);

  return (
    <FilterContext.Provider
      value={{
        searchText,
        debouncedSearchText,
        selectedFromDate,
        selectedCategory,
        selectedSource,
        handleChangeSearchText,
        handleChangeFromDate,
        handleChangeCategory,
        handleChangeSource,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}
