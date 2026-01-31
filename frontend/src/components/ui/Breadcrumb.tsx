"use client";

import { Link, usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";

interface BreadcrumbProps {
  title?: string;
}

const Breadcrumb = ({ title }: BreadcrumbProps) => {
  const t = useTranslations("Header");
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);

  const crumbs = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");

    let label = segment
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());

    if (index === segments.length - 1 && title) {
      label = title;
    }

    return { href, label };
  });

  return (
    <nav aria-label="breadcrumb">
      <ol className="flex gap-2">
        <li className="leading-[36px] text-[#767676] text-[14px] font-nunito font-normal hover:text-[#ef3340] cursor-pointer">
          <Link href="/">{t("catalog")}</Link>
        </li>

        {crumbs.map((crumb, idx) => (
          <li
            key={idx}
            className="flex items-center gap-2 leading-[36px] text-[#767676] text-[14px] font-nunito font-normal"
          >
            <span className="leading-[36px] text-[#767676] text-[14px] font-nunito font-normal">
              /
            </span>
            <Link
              href={crumb.href as any}
              className={
                idx === crumbs.length - 1
                  ? "text-black font-semibold pointer-events-none"
                  : "hover:text-[#ef3340]"
              }
            >
              {crumb.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
