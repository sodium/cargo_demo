import qs from "qs";

import type { Route } from "./+types/_index";
import { ArticleCard } from "../components/article-card";
import { HeroBanner } from "../components/hero-banner";
import type {
  Article,
  ArticleResponse,
  BannerResponse,
} from "../types/cms";
import { getCMSUrl } from "~/root";

interface LoaderData {
  articlesData: ArticleResponse;
  bannerData: BannerResponse;
}

async function loadDataFromCms(category: string, mediaField: "cover" | "image") {
  const BASE_URL = getCMSUrl();
  const path = "/api/" + category;
  const url = new URL(path, BASE_URL);
  url.search = qs.stringify({
    populate: {
      [mediaField]: {
        fields: ["url", "alternativeText"],
      },
    },
  });
  console.log("Fetching articles from Strapi:", url.href);
  const articlesData = await fetch(url.href);
  const data = await articlesData.json();
  return data;
}

// Server Side Loader
export async function loader({ params }: Route.LoaderArgs) {
  const articleData = await loadDataFromCms("articles", "cover");
  const bannerData = await loadDataFromCms("banners", "image");
  return {
    articlesData: articleData as ArticleResponse,
    bannerData: bannerData as BannerResponse,
  };
}

export function meta(/*{}: Route.MetaArgs */) {
  return [
    { title: "Home | React Router 7" },
    { name: "description", content: "Home Page" },
  ];
}

export default function IndexRoute({ loaderData }: { loaderData: LoaderData }) {
  if (!loaderData) return <p>No data found</p>;
  const baseUrl = getCMSUrl();
  const banner = loaderData.bannerData?.data?.[0] || null;

  const bannerImageUrl = banner?.image?.url
    ? banner.image.url.startsWith("http")
      ? banner.image.url
      : `${baseUrl}${banner.image.url}`
    : "";

  return (
    <>
    <section>


        <HeroBanner
        eyebrow="Operations Snapshot"
        title={banner?.title || "Flight Intelligence, Delivered Fast"}
        description={
          banner?.description ||
          ""
        }
        primaryCta={banner?.button_text || ""}
        secondaryCta=""
        imageUrl={bannerImageUrl}
        imageAlt={banner?.image?.alternativeText || ""}
        richTextDescription={banner?.content}
      />

    </section>
      

      <main className="container mx-auto px-4 py-10">
        <div className="grid gap-8 lg:grid-cols-1">
        <section id="functions">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-4 my-5">
            <a
              href="/flights"
              className="flex items-center bg-slate-200 hover:-translate-y-0.5 transition hover:border-slate-300 hover:shadow shadow-sm"
            >
              <img
                className="inline-block ml-4 h-8 w-auto"
                src="/clickandship-dark.svg"
                alt="Click & Ship"
              />
              <span className="bg-slate-200 px-5 py-4 text-left text-base font-semibold text-slate-900">
                Click & Ship
              </span>
            </a>

            <a
              href="/flights"
              className="flex items-center bg-slate-200 hover:-translate-y-0.5 transition hover:border-slate-300 hover:shadow shadow-sm"
            >
              <img
                className="inline-block ml-4 h-8 w-auto"
                src="/checkflightavailability-dark.svg"
                alt="Check Flight Schedule"
              />
              <span className="bg-slate-200 px-5 py-4 text-left text-base font-semibold text-slate-900">
                Check Flight Schedule &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+
              </span>
            </a>

             <a
              href="/flights"
              className="flex items-center bg-slate-200 hover:-translate-y-0.5 transition hover:border-slate-300 hover:shadow shadow-sm"
            >
              <img
                className="inline-block ml-4 h-8 w-auto"
                src="/trackandtrace-dark.svg"
                alt="Track and Trace"
              />
              <span className="bg-slate-200 px-5 py-4 text-left text-base font-semibold text-slate-900">
                Track and Trace
              </span>
            </a>
              
             <a
              href="/flights"
              className="flex items-center bg-slate-200 hover:-translate-y-0.5 transition hover:border-slate-300 hover:shadow shadow-sm"
            >
              <img
                className="inline-block ml-4 h-8 w-auto"
                src="/location-dark.svg"
                alt="Station Capabilities"
              />
              <span className="bg-slate-200 px-5 py-4 text-left text-base font-semibold text-slate-900">
                Station Capabilities
              </span>
            </a>

          </div>
        </section>
          <section id="articles">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Cathay Cargo news</h3>
         
            </div>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
              {loaderData.articlesData.data?.map((article: Article) => (
                <ArticleCard
                  key={article.id}
                  title={article.title}
                  description={article.description}
                  publishedAt={article.publishedAt}
                  slug={article.slug}
                  cover={article.cover}
                />
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
