import * as React from "react";
import { MonthYearSelect } from "./MonthYearSelect";
import { TimesheetTable } from "./TimesheetTable";
import type { TimesheetDto } from "../lib/types";
import { useQuery } from "@tanstack/react-query";


const MOCK_USERNAME = "bruce.wayne";

async function fetchTimesheet(username: string, yearMonth: string): Promise<TimesheetDto> {
  const [year, month] = yearMonth.split("-");
  const url = `http://localhost:8000/timesheet/${username}/${year}/${month}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch timesheet: ${res.status}`);
  }
  return res.json();
}

export const Timesheet: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = React.useState<string | undefined>(undefined);

  const queryKey = ["timesheet", MOCK_USERNAME, selectedPeriod];
  const query = useQuery({
    queryKey,
    queryFn: () =>
      selectedPeriod
        ? fetchTimesheet(MOCK_USERNAME, selectedPeriod)
        : Promise.resolve(undefined),
    enabled: !!selectedPeriod,
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <label htmlFor="period" className="font-medium text-sm">Period</label>
        <MonthYearSelect
          onChange={ (value) => {
            setSelectedPeriod(value); 
          }}
        />
      </div>
      {query.isLoading && <div className="text-muted">Loading timesheet...</div>}
      {query.data && <TimesheetTable timesheet={query.data} refetch={query.refetch} />}
      {!query.isLoading && !query.data && <div className="text-muted">Select a period to view timesheet.</div>}
    </div>
  );
}