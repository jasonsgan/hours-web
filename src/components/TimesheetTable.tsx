import * as React from "react";
import type { TimesheetDto } from "../lib/types";
import { Table, TableHeader, TableRow, TableCell, TableBody } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon, ChevronRightIcon } from "@radix-ui/react-icons";

interface TimesheetTableProps {
  timesheet: TimesheetDto;
}

export const TimesheetTable: React.FC<TimesheetTableProps> = ({ timesheet }) => {
  const [expandedRows, setExpandedRows] = React.useState<Record<number, boolean>>({});

  const toggleRow = (idx: number) => {
    setExpandedRows((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
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
              <TableRow className={expandedRows[idx] ? "bg-blue-100" : ""}>
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
                <TableCell>{log.date}</TableCell>
                <TableCell>Reg</TableCell>
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
                  {/* Remarks placeholder */}
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
  );
};