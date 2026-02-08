import type { BannerContentBlock } from "../types/cms";

interface HeroBannerProps {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  imageUrl: string;
  imageAlt: string;
  richTextDescription?: BannerContentBlock[];
}

export function HeroBanner({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  imageUrl,
  imageAlt,richTextDescription,
}: HeroBannerProps) {
    console.log(richTextDescription);
  return (
    <div className="container mx-auto px-4">
      <div className="bg-[#f3f8fa] mx-auto grid  max-w-none gap-6 px-4 pb-6 md:grid-cols-[1fr_2fr] md:items-center md:pl-10 md:pr-0 md:pb-0 md:min-h-[480px]">
        <div className="py-10">
          <p className="text-sm uppercase tracking-[0.2em] text-[#556b85]">
            {title}
          </p>
          
          <div className="mt-4 text-sm leading-6 text-black">
            {richTextDescription?.map((content, index) => {
              if (!content?.children?.length) {
                return null;
              }

              const text = content.children.map((child) => child.text).join("");

              if (content.type === "paragraph") {
                return <p key={`${content.type}-${index}`}>{text}</p>;
              }

              if (content.type === "heading") {
                return (
                  <p key={`${content.type}-${index}`} className="text-3xl font-semibold py-3">
                    {text}
                  </p>
                );
              }

              return null;
            })}
          </div>
          <div className="mt-6 flex flex-wrap sm:flex gap-3">
            <button className="px-10 py-5 text-sm font-semibold text-slate-900 bg-[#344239] text-white">
              {primaryCta}
            </button>

          </div>
        </div>
        <div className="relative h-full w-full overflow-hidden bg-white/5 md:justify-self-end md:min-h-[480px]">
          <img
            src={imageUrl}
            alt={imageAlt}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
