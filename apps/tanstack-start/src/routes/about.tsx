import { createFileRoute, Link } from "@tanstack/react-router";
import * as m from "~/paraglide/messages";

export const Route = createFileRoute("/about")({
  component: AboutComponent,
});

function AboutComponent() {
  return (
    <main className="container flex min-h-screen flex-col items-center justify-center py-16 gap-8">
      <h1 className="text-center text-5xl font-extrabold tracking-tight sm:text-[5rem]">
        {m.about_page()}
      </h1>
      <p className="text-muted-foreground mt-4 max-w-lg text-center text-lg">
        Notice how the URL path is translated based on the locale, but the route logic remains exactly the same!
      </p>
      
      <Link 
        to="/"
        className="text-primary hover:underline font-semibold"
      >
        Go back to Home
      </Link>
    </main>
  );
}
