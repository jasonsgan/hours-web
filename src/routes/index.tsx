import { Timesheet } from "../components/Timesheet";
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
})


function App() {
  return (
    <div className="text-center">
      <div className="max-w-5xl mx-auto my-8">
        <Timesheet />
      </div>
    </div>
  );
}
