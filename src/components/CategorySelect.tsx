import { useFilterContext } from "@/lib/hooks";
import { X } from "lucide-react";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const CategorySelect = () => {
  const { selectedCategory, handleChangeCategory } = useFilterContext();

  return (
    <div className="rounded-md bg-slate-950 w-[320px] md:w-[180px]">
      <div className="relative ">
        <Select
          onValueChange={handleChangeCategory}
          value={selectedCategory || ""}
        >
          <SelectTrigger className="w-full dark">
            <SelectValue placeholder="Select category" className="dark" />
          </SelectTrigger>
          <SelectContent className="dark">
            <SelectGroup>
              <SelectLabel>Categories</SelectLabel>
              <SelectItem value="arts">Arts</SelectItem>
              <SelectItem value="automobiles">Automobiles</SelectItem>
              <SelectItem value="business">Business</SelectItem>
              <SelectItem value="sports">Sports</SelectItem>
              <SelectItem value="science">Science</SelectItem>
              <SelectItem value="technology">Technology</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        {selectedCategory && (
          <Button
            type="button"
            onClick={() => {
              handleChangeCategory("");
            }}
            className="absolute right-8 top-1/2 -translate-y-1/2 rounded-full p-1 hover:bg-accent hover:text-accent-foreground size-6"
            aria-label="Clear selection"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default CategorySelect;
