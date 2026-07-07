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
import { Analytics } from "@vercel/analytics/react";
import { visitorStore } from "@/lib/visitor-store";
import { WhatsAppButton } from "@/components/WhatsAppButton";
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
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600;700;800&display=swap",
      },
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

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  useEffect(() => {
    // Sync stores with server database on startup
    async function syncDatabase() {
      try {
        const db = await getServerDb();
        productStore.sync(db.products);
        siteSettingsStore.sync(db.settings);
        bannerStore.sync(db.slides, db.popup);
        orderStore.sync(db.orders);
      } catch (err) {
        console.error('Failed to sync database with server:', err);
      }
    }
    syncDatabase();

    // Track page views for admin dashboard
    visitorStore.record(window.location.pathname);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <WhatsAppButton />
      <Analytics />
    </QueryClientProvider>
  );
}
