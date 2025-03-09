import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { Calendar } from "./ui/calendar";
import { format } from "date-fns/format";
import { X } from "lucide-react";
import { useFilterContext } from "@/lib/hooks";

const FromDateSelection = () => {
  const { selectedFromDate, handleChangeFromDate } = useFilterContext();
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "justify-start text-left font-normal relative dark w-[320px] md:w-[180px]",
            !selectedFromDate && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selectedFromDate ? (
            format(selectedFromDate, "PPP")
          ) : (
            <span>Pick a date</span>
          )}
          {selectedFromDate && (
            <ClearDate onDateClear={() => handleChangeFromDate(undefined)} />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 dark">
        <Calendar
          mode="single"
          selected={selectedFromDate}
          onSelect={(newDate) => {
            handleChangeFromDate(newDate);
            setOpen(false);
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

const ClearDate = ({ onDateClear }: { onDateClear: () => void }) => {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="absolute right-1 h-6 w-6 rounded-full p-0"
      onClick={(e) => {
        e.stopPropagation();
        // setDate(undefined);
        onDateClear();
      }}
    >
      <span className="sr-only">Clear date</span>
      <X />
    </Button>
  );
};

export default FromDateSelection;
