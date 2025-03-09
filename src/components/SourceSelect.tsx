import { useFilterContext } from "@/lib/hooks";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { sources } from "@/lib/constants";
import { Button } from "./ui/button";
import { X } from "lucide-react";

const SourceSelect = () => {
  const { selectedSource, handleChangeSource } = useFilterContext();
  return (
    <div className="rounded-md bg-slate-950 w-[320px] md:w-[180px]">
      <div className="relative">
        <Select onValueChange={handleChangeSource} value={selectedSource || ""}>
          <SelectTrigger className="w-[320px] md:w-[180px] dark">
            <SelectValue placeholder="Select source" />
          </SelectTrigger>
          <SelectContent className="dark">
            <SelectGroup>
              <SelectLabel>Sources</SelectLabel>
              {sources.map((source) => (
                <SelectItem value={source.value} key={source.value}>
                  {source.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {selectedSource && (
          <Button
            type="button"
            onClick={() => {
              handleChangeSource("");
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

export default SourceSelect;
