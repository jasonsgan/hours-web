import * as React from "react";
import type { TimesheetDto, TimeLogDto } from "../lib/types";
import { EditTimesheet } from "./EditTimesheet";
import { Table, TableHeader, TableRow, TableCell, TableBody } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { formatDate, getMonday, getSunday } from "../lib/date.utils";

interface TimesheetTableProps {
  timesheet: TimesheetDto;
}

function displayRemarks(timeLog: TimeLogDto): string {
  let result = "";
  if (timeLog.remarks) {
    result += `Remars: ${timeLog.remarks}`;
  }
  if (timeLog.overrideReason) {
    if (result) {
      result += "<br/>";
    }
    result += `Override Reason: ${timeLog.overrideReason}`; 
  }
  return result;
}

export const TimesheetTable: React.FC<TimesheetTableProps> = ({ timesheet }) => {
  const [expandedRows, setExpandedRows] = React.useState<Record<number, boolean>>({});
  const [editOpen, setEditOpen] = React.useState(false);
  const [editWeekTimesheet, setEditWeekTimesheet] = React.useState<TimesheetDto | null>(null);

  const toggleRow = (idx: number) => {
    setExpandedRows((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  // On date click: open modal for week
  function handleDateClick(idx: number) {
    const clickedTimeLog = timesheet.timeLogs[idx];
    console.log(`Clicked idx=${idx}, date=${clickedTimeLog.date}`);
    const date = new Date(clickedTimeLog.date);
    const monday = formatDate(getMonday(date));
    const sunday = formatDate(getSunday(date));
    console.log(`Week range: ${monday} to ${sunday}`);
    // Filter logs for the week (inclusive)
    const weekLogs = timesheet.timeLogs.filter( (timeLog) => {
      return timeLog.date >= monday && timeLog.date <= sunday;
    });
    setEditWeekTimesheet({ timeLogs: weekLogs });
    setEditOpen(true);
  }

  return (
    <>
      <div className="rounded-lg border bg-background p-4 shadow">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted">
              <TableCell></TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Shift</TableCell>
              <TableCell>Time In</TableCell>
              <TableCell>Time Out</TableCell>
              <TableCell>Elapsed Time (hh:mm)</TableCell>
              <TableCell>Total Work Hours</TableCell>
              <TableCell>Actions</TableCell>
              <TableCell>Remarks</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {timesheet.timeLogs.map((log, idx) => (
              <React.Fragment key={idx}>
                <TableRow className={
                  expandedRows[idx]
                    ? "bg-blue-100"
                    : log.weekend
                      ? "bg-gray-100"
                      : ""
                }>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleRow(idx)}
                      aria-label={expandedRows[idx] ? "Hide tasks" : "Show tasks"}
                    >
                      {expandedRows[idx] ? <ChevronDownIcon /> : <ChevronRightIcon />}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <button
                      className="text-blue-700 underline hover:text-blue-900"
                      onClick={() => handleDateClick(idx)}
                      type="button"
                    >
                      {log.date}
                    </button>
                  </TableCell>
                  <TableCell>{log.shift}</TableCell>
                  <TableCell>{log.timeIn}</TableCell>
                  <TableCell>{log.timeOut}</TableCell>
                  <TableCell>{log.elapsedTime}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 rounded bg-blue-500 text-white font-bold">{log.workedHours}</span>
                  </TableCell>
                  <TableCell>
                    {/* Actions placeholder */}
                  </TableCell>
                  <TableCell>
                    {displayRemarks(log)}
                  </TableCell>
                </TableRow>
                {expandedRows[idx] && (
                  <TableRow>
                    <TableCell colSpan={9} className="bg-yellow-50 p-0">
                      <div className="overflow-x-auto">
                        <Table className="w-full mt-2">
                          <TableHeader>
                            <TableRow className="bg-muted">
                              <TableCell>Project</TableCell>
                              <TableCell>Task</TableCell>
                              <TableCell>DA Type</TableCell>
                              <TableCell>Logged Hours</TableCell>
                              <TableCell>Task Description</TableCell>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {log.tasks.map((task, tIdx) => (
                              <TableRow key={tIdx} className={tIdx % 2 === 1 ? "bg-gray-100" : ""}>
                                <TableCell>{task.projectName}</TableCell>
                                <TableCell>{task.taskName}</TableCell>
                                <TableCell>Normal</TableCell>
                                <TableCell>{task.hours}</TableCell>
                                <TableCell>{task.taskDescription}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
      {editWeekTimesheet && (
        <EditTimesheet
          open={editOpen}
          onOpenChange={setEditOpen}
          timesheet={editWeekTimesheet}
        />
      )}
    </>
  );
};