import { useMemo, useState } from "react";

interface DatePickerProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

function formatDate(value: Date) {
  const year = value.getFullYear();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[value.getMonth()];
  const day = String(value.getDate()).padStart(2, "0");
  return `${day} ${month} ${year}`;
}

function getMonthMatrix(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  const startWeekday = firstDay.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const weeks: Array<Array<number | null>> = [];
  let currentDay = 1 - startWeekday;

  while (currentDay <= daysInMonth) {
    const week: Array<number | null> = [];
    for (let i = 0; i < 7; i += 1) {
      if (currentDay < 1 || currentDay > daysInMonth) {
        week.push(null);
      } else {
        week.push(currentDay);
      }
      currentDay += 1;
    }
    weeks.push(week);
  }

  return weeks;
}

export function DatePicker({ value, onChange, placeholder }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Date | null>(
    value ? new Date(value) : null
  );
  const [viewDate, setViewDate] = useState(() => selected || new Date());

  const weeks = useMemo(
    () => getMonthMatrix(viewDate.getFullYear(), viewDate.getMonth()),
    [viewDate]
  );

  const formattedValue = selected ? formatDate(selected) : "";

  const handleSelect = (day: number) => {
    const next = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    setSelected(next);
    onChange?.(formatDate(next));
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        className="mt-2 w-full border border-slate-200 bg-white px-3 py-2 text-left text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-black-500 focus:border-black-500"
        onClick={() => setIsOpen((open) => !open)}
      >
        {formattedValue || placeholder || "Select a date"}
      </button>
      {isOpen ? (
        <div className="absolute z-10 mt-2 w-64 rounded-md border border-slate-200 bg-white p-3 shadow-lg">
          <div className="flex items-center justify-between">
            <button
              type="button"
              className="px-2 py-1 text-sm text-slate-600"
              onClick={() =>
                setViewDate(
                  new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1)
                )
              }
            >
              Prev
            </button>
            <p className="text-sm font-semibold text-slate-700">
              {viewDate.toLocaleString("default", {
                month: "long",
              })}{" "}
              {viewDate.getFullYear()}
            </p>
            <button
              type="button"
              className="px-2 py-1 text-sm text-slate-600"
              onClick={() =>
                setViewDate(
                  new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1)
                )
              }
            >
              Next
            </button>
          </div>
          <div className="mt-3 grid grid-cols-7 gap-1 text-center text-xs text-slate-500">
            {"SMTWTFS".split("").map((day) => (
              <div key={day}>{day}</div>
            ))}
          </div>
          <div className="mt-2 grid gap-1">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="grid grid-cols-7 gap-1">
                {week.map((day, dayIndex) => (
                  <button
                    key={`${weekIndex}-${dayIndex}`}
                    type="button"
                    disabled={day === null}
                    className={
                      day === null
                        ? "h-8 text-transparent"
                        : "h-8 rounded-sm text-sm text-slate-700 hover:bg-slate-100"
                    }
                    onClick={() => day && handleSelect(day)}
                  >
                    {day ?? ""}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
