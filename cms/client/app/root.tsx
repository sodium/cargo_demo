import qs from "qs";

import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import { FooterTemplate } from "./components/footer-template";
import {
  HeaderTemplate
} from "./components/header-template";
import "./app.css";

import type { HeaderFooterResponse } from "./types/cms";

// TODO: make this as common function to fetch header footer data, and use it in all routes
export async function loadHeaderFooterData(): Promise<HeaderFooterResponse> {
  const BASE_URL = getCMSUrl();;
  const path = "/api/header-footer-items";
  const url = new URL(path, BASE_URL);
  url.search = qs.stringify({
    populate: {
      "image": {
        fields: ["url", "alternativeText"],
      },
    },
  });
  console.log("Fetching articles from Strapi:", url.href);
  const returnData = await fetch(url.href);
  const data = await returnData.json();
  return data as HeaderFooterResponse;
}

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

interface LoaderData {
  headerFooterData: Awaited<ReturnType<typeof loadHeaderFooterData>>;
}

export async function loader() {
  const headerFooterData = await loadHeaderFooterData();
  return { headerFooterData } satisfies LoaderData;
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export const getCMSUrl = () => {
  if (typeof process !== "undefined") {
    return process.env.VITE_STRAPI_URL || "http://localhost:1337";
  }
  return import.meta.env.VITE_STRAPI_URL || "http://localhost:1337";
};

export const getImageBaseUrl = () => {
  if (typeof process !== "undefined") {
    return process.env.CLIENT_IMAGE_BASE_URL || "http://localhost:1337";
  }
  return import.meta.env.CLIENT_IMAGE_BASE_URL || "http://localhost:1337";
};

export default function App({ loaderData }: Route.ComponentProps) {
  const baseUrl = getCMSUrl();
  const headerFooterItems = loaderData?.headerFooterData?.data ?? [];

  const headerNavItems = headerFooterItems
    .filter(
      (item) =>
        item.section === "header" &&
        item.english_text &&
        item.english_url,
    )
    .map((item) => ({ 
      label: item.english_text, 
      href: item.english_url, 
      imageUrl: (item.display_as_image && item.image?.url) || undefined,
      group: item.group,
    }));

    const footerNavItems = headerFooterItems
    .filter(
      (item) =>
        item.section === "footer"
    )
    .map((item) => ({ 
      label: item.english_text, 
      href: item.english_url, 
      imageUrl: (item.display_as_image && item.image?.url) || undefined,
      group: item.group,
      external: item.external_site,
    }));

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <HeaderTemplate
        title=""
        eyebrow=""
        navItems={
          headerNavItems.length > 0
            ? headerNavItems
            : [ ]
        }
      />
      <Outlet />
      <div id="footer">
        <FooterTemplate
        title=""
         navItems={
          footerNavItems.length > 0
            ? footerNavItems
            : [ ]
        }
        />
      </div>
    </div>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
