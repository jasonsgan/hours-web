import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { TimesheetDto, EditTimeLogDto } from "../lib/types";

const username = 'batman';

const  fetchTimesheet = async (yearMonth: string): Promise<TimesheetDto> => {
  const [year, month] = yearMonth.split("-");
  const url = `http://localhost:8000/timesheet/${username}/${year}/${month}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch timesheet: ${res.status}`);
  }
  return res.json();
};

const editTimesheet = async (editLogs: EditTimeLogDto[]) => {
  const res = await fetch(`http://localhost:8000/timesheet/${username}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ timeLogs: editLogs }),
  });
  if (!res.ok) throw new Error(`Failed to save timesheet: ${res.status}`);
};

export const timesheetKeys = {
    timesheets: () => {
      return [ 'timesheet' ];
    },
    timesheet: (yearMonth: string) => {
        return [ 'timesheet', yearMonth ];
    }
};

export const useTimesheetQuery = (yearMonth: string | undefined) => {
  yearMonth = yearMonth ? yearMonth : '';
  const enabled = yearMonth ? true : false;
  return useQuery({
    queryKey: timesheetKeys.timesheet(yearMonth),
    queryFn: () => fetchTimesheet(yearMonth),
    enabled
  });
}

export const useTimesheetMutation = (onSave: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editTimesheet,
    onSuccess: () => {
      onSave();
      queryClient.invalidateQueries({ queryKey: timesheetKeys.timesheets() });
    },
  });
};