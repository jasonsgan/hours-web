import * as React from "react";
import { MonthYearSelect } from "./MonthYearSelect";
import { TimesheetTable } from "./TimesheetTable";
import { useTimesheetQuery } from '../hooks/useTimesheet';

export const Timesheet: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = React.useState<string | undefined>(undefined);

  const query = useTimesheetQuery(selectedPeriod);

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