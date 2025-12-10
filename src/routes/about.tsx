import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/about')({
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-4">About</h1>
      <p className="text-lg text-muted-foreground mb-2">
        This is the HOURS by Pointwest web application.
      </p>
      <p className="text-base">
        Built with React, Tanstack Router, and Shadcn UI.
      </p>
    </div>
  );
}
