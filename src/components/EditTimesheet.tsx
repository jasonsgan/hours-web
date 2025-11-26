import * as React from "react";
import { useMutation } from "@tanstack/react-query";
import type { EditTimesheetDto, EditTimeLogDto } from "../lib/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
} from "@/components/ui/table";
// Removed unused Select imports
import { Input } from "@/components/ui/input";


interface EditTimesheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  timesheet: EditTimesheetDto;
  username?: string; // Needed for API call
}

const timeOptions = [
  "-",
  "7:00 AM", "7:30 AM", "8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM",
  "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM"
];

const shiftOptions = ["Reg"];

export const EditTimesheet: React.FC<EditTimesheetProps> = ({ open, onOpenChange, timesheet, username = "bruce.wayne" }) => {
        // Tanstack Query mutation for PUT /timesheet/{username}
        const mutation = useMutation({
          mutationFn: async (editLogs: EditTimeLogDto[]) => {
            const res = await fetch(`http://localhost:8000/timesheet/${username}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ timeLogs: editLogs }),
            });
            if (!res.ok) throw new Error(`Failed to save timesheet: ${res.status}`);
            //return res.json();
          },
        });
      // Initialize editable state from timesheet
  const [editLogs, setEditLogs] = React.useState<EditTimeLogDto[]>([]);

  // Manual checkboxes state
  const [manualTimeIn, setManualTimeIn] = React.useState<boolean[]>([]);
  const [manualTimeOut, setManualTimeOut] = React.useState<boolean[]>([]);

  React.useEffect(() => {
    setEditLogs(timesheet.timeLogs.map((log: EditTimeLogDto) => ({
      date: log.date,
      shift: log.shift,
      timeIn: log.timeIn,
      timeOut: log.timeOut,
      remarks: log.remarks,
      overrideReason: log.overrideReason,
      weekend: log.weekend
    })));
    setManualTimeIn(timesheet.timeLogs.map(() => false));
    setManualTimeOut(timesheet.timeLogs.map(() => false));
  }, [timesheet]);


  const handleChange = (idx: number, field: keyof EditTimeLogDto, value: string) => {
    setEditLogs(editLogs.map((editLog, i) => {
      return i === idx ? { ...editLog, [field]: value } : editLog;
    }));
  };

  const handleManualChange = (idx: number, field: "in" | "out", checked: boolean) => {
    if (field === "in") setManualTimeIn((prev) => prev.map((v, i) => i === idx ? checked : v));
    else setManualTimeOut((prev) => prev.map((v, i) => i === idx ? checked : v));
  };

  const handleSave = async () => {
    try {
      await mutation.mutateAsync(editLogs);
      onOpenChange(false);
    } catch (err) {
      alert("Failed to save timesheet. Please try again.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl md:max-w-4xl lg:max-w-5xl">
        <DialogHeader>
          <DialogTitle>
            <div className="bg-orange-500 text-white px-4 py-2 rounded-t-lg text-lg font-bold">Edit Timelogs</div>
          </DialogTitle>
        </DialogHeader>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-300">
                <TableHead>Date</TableHead>
                <TableHead>Shift</TableHead>
                <TableHead>Time In<br /><span className="font-normal">Time(hh:mm AM/PM)</span></TableHead>
                <TableHead>Time Out<br /><span className="font-normal">Time(hh:mm AM/PM)</span></TableHead>
                <TableHead>Remarks</TableHead>
                <TableHead>Reason for TITO Override</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {editLogs.map((log, idx) => (
                <TableRow key={log.date} className={log.weekend ? "bg-blue-200" : ""}>
                  <TableCell>{log.date}</TableCell>
                  <TableCell>{log.shift}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <Input
                        value={log.timeIn}
                        onChange={e => handleChange(idx, "timeIn", e.target.value)}
                        className="w-32"
                        placeholder=""
                        disabled={manualTimeIn[idx]}
                      />
                      <label className="flex items-center gap-1 text-xs">
                        <input
                          type="checkbox"
                          checked={manualTimeIn[idx]}
                          onChange={e => handleManualChange(idx, "in", e.target.checked)}
                        />
                        Manual TimeIn
                      </label>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <Input
                        value={log.timeOut}
                        onChange={e => handleChange(idx, "timeOut", e.target.value)}
                        className="w-32"
                        placeholder=""
                        disabled={manualTimeOut[idx]}
                      />
                      <label className="flex items-center gap-1 text-xs">
                        <input
                          type="checkbox"
                          checked={manualTimeOut[idx]}
                          onChange={e => handleManualChange(idx, "out", e.target.checked)}
                        />
                        Manual TimeOut
                      </label>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Input
                      value={log.remarks}
                      onChange={e => handleChange(idx, "remarks", e.target.value)}
                      className="w-32"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      value={log.overrideReason}
                      onChange={e => handleChange(idx, "overrideReason", e.target.value)}
                      className="w-32"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <button className="text-blue-600 hover:underline px-4 py-2 rounded">Cancel</button>
          </DialogClose>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={handleSave}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Saving..." : "Save"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};