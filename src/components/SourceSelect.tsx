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

const SourceSelect = () => {
  const { selectedSource, handleChangeSource } = useFilterContext();
  return (
    <div className="rounded-md bg-slate-950">
      <Select
        onValueChange={handleChangeSource}
        value={selectedSource || undefined}
      >
        <SelectTrigger className="w-[180px] dark">
          <SelectValue placeholder="Select source" />
        </SelectTrigger>
        <SelectContent className="dark">
          <SelectGroup>
            <SelectLabel>Sources</SelectLabel>
            {sources.map((source) => (
              <SelectItem value={source.value}>{source.label}</SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SourceSelect;
