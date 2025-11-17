import * as React from "react";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

interface MonthYearSelectProps {
  value?: string; // YYYY-MM
  onChange?: (value: string) => void;
}

function getMonthYearOptions(): { label: string; value: string }[] {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth(); // 0-based
  const lastYear = currentYear - 1;
  const options: { label: string; value: string }[] = [];
  for (let year = lastYear; year <= currentYear; year++) {
    const startMonth = year === lastYear ? 0 : 0;
    const endMonth = year === currentYear ? currentMonth : 11;
    for (let month = startMonth; month <= endMonth; month++) {
      const date = new Date(year, month, 1);
      const label = date.toLocaleString("default", { month: "long", year: "numeric" });
      const value = `${year}-${String(month + 1).padStart(2, "0")}`;
      options.push({ label, value });
    }
  }
  return options;
}

export const MonthYearSelect: React.FC<MonthYearSelectProps> = ({ value, onChange }) => {
  const options = getMonthYearOptions();
  return (
    <Select onValueChange={onChange}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select a period" />
      </SelectTrigger>
      <SelectContent>
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};