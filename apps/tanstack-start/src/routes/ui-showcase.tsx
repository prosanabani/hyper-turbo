import { createFileRoute, Link } from "@tanstack/react-router";

import { UiShowcase } from "~/components/ui-showcase";

export const Route = createFileRoute("/ui-showcase")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <div className="container pt-4">
        <Link
          to="/"
          className="text-primary text-sm font-medium hover:underline"
        >
          ← Home
        </Link>
      </div>
      <UiShowcase />
    </>
  );
}
