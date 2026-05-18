import { createFileRoute, Link } from "@tanstack/react-router";

import * as m from "~/paraglide/messages";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="container flex min-h-screen flex-col items-center justify-center gap-8 py-16">
      <h1 className="text-center text-5xl font-extrabold tracking-tight sm:text-[5rem]">
        {m.home_page()}
      </h1>
      <p className="text-muted-foreground mt-4 max-w-lg text-center text-lg">
        This is an example of Paraglide i18n localization in TanStack Start.
      </p>

      <Link to="/about" className="text-primary font-semibold hover:underline">
        Go to About Page
      </Link>
    </main>
  );
}
