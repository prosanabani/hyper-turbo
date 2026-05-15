import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="container flex min-h-screen flex-col items-center justify-center py-16">
      <h1 className="text-center text-5xl font-extrabold tracking-tight sm:text-[5rem]">
        TanStack <span className="text-primary">Start</span>
      </h1>
      <p className="text-muted-foreground mt-4 max-w-lg text-center text-lg">
        Starter template — add your routes, data layer, and API as needed.
      </p>
    </main>
  );
}
