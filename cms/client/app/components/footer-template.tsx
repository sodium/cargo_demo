import { getCMSUrl } from "~/root";
import { getImageBaseUrl } from "~/root";

interface NavItem {
  label: string;
  href: string;
  imageUrl?: string;
  group?: string;
  external?: boolean;
}

interface FooterTemplateProps {
  title: string;
  eyebrow?: string;
  navItems?: NavItem[];
}

interface FooterColumnProps {
    title: string;
    items: NavItem[];
}

function FooterColumn({ title, items }: FooterColumnProps) {
    return (
        <div className="justify-left flex flex-col gap-2">
            <span className="text-lg font-bold">{title}</span>

            {items?.map((item) => (
                <div key={item.href} className="text-slate-300">
                    <a href={item.href}>
                        {item.label}
                        {item.external && (
                            <svg
                                className="inline-block mx-1"
                                height="1em"
                                viewBox="0 0 14 12"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M14 7.898H3.821V0H14v7.898zm-9.295-.996h8.32V.996h-8.32v5.906zM9.789 12H0V4.102h2.444v.996H.975v5.906h7.838V9h.976v3z"
                                    fill="currentColor"
                                    fillRule="evenodd"
                                ></path>
                            </svg>
                        )}
                    </a>
                </div>
            ))}
        </div>
    );
}

    export function FooterTemplate({ navItems = [] }: FooterTemplateProps) {
        //const menuItems = navItems.filter((item) => item.group?.toLowerCase() === "header::menu");
        //const logoUrl = logoItems ? getCMSUrl() + logoItems.imageUrl : "";
        const group1Items = navItems.filter((item) => item.group?.toLowerCase() === "footer::about");
        const group2Items = navItems.filter((item) => item.group?.toLowerCase() === "footer::privacy");
        const group3Items = navItems.filter((item) => item.group?.toLowerCase() === "footer::tnc");
        const group4Items = navItems.filter((item) => item.group?.toLowerCase() === "footer::subsidiaries");

        const groupImageItems = navItems.filter((item) => item.group?.toLowerCase() === "footer::folow");
        const cmsBaseUrl = getCMSUrl();
        const imageBaseUrl = getImageBaseUrl();

    return (
        <footer className="bg-green-900 text-white">

        <div className="mx-auto flex flex-col items-center justify-center gap-4 py-6 text-sm text-white">

                <div className="grid md:grid-cols-4 sm:grid-row-4 items-start md:justify-center sm:justify-start gap-8 px-10 py-10">
                    <FooterColumn title="About us" items={group1Items} />
                    <FooterColumn title="Privacy" items={group2Items} />
                    <FooterColumn title="Terms & Conditions" items={group3Items} />
                    <FooterColumn title="Cathay Subsidiaries" items={group4Items} />
                    
                </div>
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 py-6 text-sm text-white">
                    <div className="text-2xl font-bold justify-end">
                        Follow
                        <br/>
                        <span className="font-bold">in</span>
                    </div>


                    {groupImageItems?.map((item) => (
                    <div key={item.href} className="text-slate-300">
                        <a
                            key={item.label}
                            className="inline-flex items-center"
                            href={item.href || "#"}
                        >
                            <img className="h-20 w-auto" src={cmsBaseUrl+item.imageUrl} alt="" />
                        </a>
                    </div>
                ))}
                    </div>
                <div className="mx-auto w-full border-t-1 border-solid border-white mt-4 pt-4 px-4 text-left text-xs text-slate-300">
                    Copyright ⑧ Tommy Ho, Cargo Demo, 2026, Tommy Ho. All rights reserved.
                </div>
            
            
        </div>
        </footer>
    );
    }
