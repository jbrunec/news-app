import { useFilterContext } from "@/lib/hooks";
import { ChangeEvent } from "react";
import CategorySelect from "./CategorySelect";
import FromDateSelection from "./FromDateSelection";
import { Input } from "./ui/input";
import SourceSelect from "./SourceSelect";

const SearchAndFilter = () => {
  const { searchText, handleChangeSearchText } = useFilterContext();

  const onSearch = (event: ChangeEvent<HTMLInputElement>) => {
    handleChangeSearchText(event.target.value);
  };

  return (
    <div className="flex flex-col items-center md:flex-row mb-8 gap-4">
      <Input
        placeholder="Keyword search..."
        onChange={onSearch}
        value={searchText}
        className="w-[320px] md:w-[180px]"
      />
      <FromDateSelection />
      <CategorySelect />
      <SourceSelect />
    </div>
  );
};

export default SearchAndFilter;
