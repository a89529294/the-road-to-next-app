"use client";

import { format } from "date-fns";
import { LucideCalendar } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePicker({
  id,
  name,
  defaultValue,
  onChange,
}: {
  id: string;
  name: string;
  defaultValue?: string | undefined;
  onChange: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(
    defaultValue ? new Date(defaultValue) : new Date(),
  );

  const formattedStringDate = date ? format(date, "yyyy-MM-dd") : "";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <input type="hidden" name={name} value={formattedStringDate} />
      <PopoverTrigger className="w-full" id={id} asChild>
        <Button
          variant={"outline"}
          className="justify-start text-left font-normal"
        >
          <LucideCalendar className="mr-2 h-4 w-4" />
          {formattedStringDate}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(d) => {
            setDate(d);
            setOpen(false);
            onChange();
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
