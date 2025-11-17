import { TimesheetTable } from "../components/TimesheetTable";
import { MonthYearSelect } from "../components/MonthYearSelect";
import type { TimesheetDto } from "../lib/types";
// Sample data for demonstration
const sampleTimesheet: TimesheetDto = {
  timeLogs: [
    {
      date: "10/1/2025",
      timeIn: "8:43 AM UP",
      timeOut: "7:00 PM UP",
      elapsedTime: "10:17",
      workedHours: 8,
      tasks: [
        {
          projectName: "Benoite",
          taskName: "2025 SMG General Activities",
          hours: 7,
          taskDescription: "Attended Softcon 2025 conference"
        },
        {
          projectName: "BD for MC3",
          taskName: "[AALI] Proposal Development",
          hours: 1,
          taskDescription: "Proposal work for MC3"
        }
      ]
    },
    {
      date: "10/2/2025",
      timeIn: "9:58 AM UP",
      timeOut: "7:16 PM UP",
      elapsedTime: "09:18",
      workedHours: 8,
      tasks: [
        {
          projectName: "Benoite",
          taskName: "2025 SMG General Activities",
          hours: 7,
          taskDescription: "General admin work"
        },
        {
          projectName: "BD for MC3",
          taskName: "[AALI] Proposal Development",
          hours: 1,
          taskDescription: "WFH: Proposal review"
        }
      ]
    },
    {
      date: "10/3/2025",
      timeIn: "10:00 AM RW",
      timeOut: "7:00 PM RW",
      elapsedTime: "09:00",
      workedHours: 8,
      tasks: [
        {
          projectName: "Benoite",
          taskName: "2025 SMG General Activities",
          hours: 8,
          taskDescription: "Routine tasks"
        }
      ]
    }
  ]
};
import { createFileRoute } from '@tanstack/react-router'
import logo from '../logo.svg'

export const Route = createFileRoute('/')({
  component: App,
})

function onChange(value: string) {
  console.log("Selected month-year:", value);
}

function App() {
  return (
    <div className="text-center">
      <header className="min-h-screen flex flex-col items-center justify-center bg-[#282c34] text-white text-[calc(10px+2vmin)]">
        <img
          src={logo}
          className="h-[40vmin] pointer-events-none animate-[spin_20s_linear_infinite]"
          alt="logo"
        />
        <p>
          Edit <code>src/routes/index.tsx</code> and save to reload.
        </p>
        <a
          className="text-[#61dafb] hover:underline"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <a
          className="text-[#61dafb] hover:underline"
          href="https://tanstack.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn TanStack
        </a>
      </header>
      <div className="max-w-5xl mx-auto my-8">
        <MonthYearSelect onChange={onChange} />
        <TimesheetTable timesheet={sampleTimesheet} />
      </div>
    </div>
  );
}
