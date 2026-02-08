import { getCMSUrl } from "~/root";

interface NavItem {
  label: string;
  href: string;
  imageUrl?: string;
  group?: string;
}

interface HeaderTemplateProps {
  title: string;
  eyebrow?: string;
  navItems?: NavItem[];
}




export function HeaderTemplate({
  title,
  eyebrow,
  navItems = [],
}: HeaderTemplateProps) {
    const logoItems = navItems.find((item) => item.group?.toLowerCase() === "header::icon");
    const menuItems = navItems.filter((item) => item.group?.toLowerCase() === "header::menu");
    const logoUrl = logoItems ? getCMSUrl() + logoItems.imageUrl : "";
  return (
    <header className="border-b border-slate-200 bg-white">
    <div className="container mx-auto">
        <div className="grid min-h-32 grid-rows-auto">
            <div className="bg-slate-100 text-green-800 h-10 py-2 text-xs flex items-center justify-end gap-1 px-4 truncate">
                <svg className="size-5" focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></svg>
                <span>Search</span>
                <span className="h-5 w-5 py-1 px-2 text-slate-400">|</span>
                <img src="/icon-contact-us.svg" alt="Contact Icon" className="size-5 object-contain" />
                <span>Contact us</span>
            </div>
            
        <div className="container mx-auto flex md:flex-row flex-col items-center justify-left px-0 py-5">
            <div className="text-xs uppercase tracking-[0.2em] text-slate-500 mr-5 md:pl-2">
                <a href="/">
                <img src={logoUrl} alt="Cathay Cargo Logo" /></a>
            </div>
            {menuItems.length > 0 ? (
            <nav className="gap-6 text-sm font-medium text-slate-600  items-center pt-2 md:flex sm:grid sm:text-center sm:items-center" >
                {menuItems.map((item) => (
                <div className="sm:text-ellipsis py-4">
                <a key={item.href} className="hover:text-slate-900" href={item.href}>
                    {item.label}
                </a>
                </div>
                ))}
            </nav>
            ) : null}
         </div>
        </div>
    </div>
    </header>
  );
}
