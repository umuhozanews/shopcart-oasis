import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { visitorStore } from "@/lib/visitor-store";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ChatWidget } from "@/components/ChatWidget";
import { getServerDb } from "@/lib/server-db";
import { productStore } from "@/lib/product-store";
import { siteSettingsStore } from "@/lib/site-settings-store";
import { bannerStore } from "@/lib/banner-store";
import { orderStore } from "@/lib/order-store";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Something went wrong
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          An unexpected error occurred. Try refreshing the page.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  // Runs server-side on every full page load — fetches the real database state
  // so admin changes are immediately visible to every visitor without any delay
  loader: async () => {
    const db = await getServerDb();
    return { db };
  },
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Hippo Technology — Premium Audio & Electronics Rwanda" },
      {
        name: "description",
        content:
          "Shop premium headphones, earbuds, and electronics at Hippo Technology Rwanda. Free delivery, genuine products, 30-day returns.",
      },
      { property: "og:title", content: "Hippo Technology — Your World, Upgraded." },
      {
        property: "og:description",
        content:
          "Rwanda's premier destination for premium audio and electronics.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://www.hippotech.rw/hippo-logo.png" },
      { property: "og:image:width", content: "800" },
      { property: "og:image:height", content: "400" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://www.hippotech.rw/hippo-logo.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600;700;800&display=swap",
      },
      { rel: "shortcut icon", href: "/favicon.ico" },
      { rel: "icon", href: "/hippo-logo.png", type: "image/png" },
      { rel: "apple-touch-icon", href: "/hippo-logo.png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

// Module-level flag resets automatically on every full browser refresh
// (JS modules are re-evaluated on hard reload, clearing this value)
let _didSyncFromServer = false;

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const { db } = Route.useLoaderData();

  // Populate stores from server DB synchronously before any child renders.
  // Only sync products if the server loaded from real storage (blob/disk).
  // When _fromPersistence is false the server has no blob token and returned
  // only defaults — syncing would wipe any products the admin already saved
  // to localStorage on this browser.
  if (typeof window !== 'undefined' && !_didSyncFromServer && db) {
    _didSyncFromServer = true;
    if (db._fromPersistence) {
      productStore.sync(db.products);
      orderStore.sync(db.orders);
    }
    siteSettingsStore.sync(db.settings);
    bannerStore.sync(db.slides, db.popup);
  }

  useEffect(() => {
    visitorStore.record(window.location.pathname);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <WhatsAppButton />
      <ChatWidget />
    </QueryClientProvider>
  );
}
