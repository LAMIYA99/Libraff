"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Breadcrumb = () => {
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);

  const crumbs = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");

    const label = segment
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());

    return { href, label };
  });

  return (
    <nav aria-label="breadcrumb">
      <ol className="flex gap-2">
        <li className="leading-[36px] text-[#767676] text-[14px] font-nunito font-normal hover:text-[#ef3340] cursor-pointer">
          <Link href="/">Əsas səhifə</Link>
        </li>

        {crumbs.map((crumb, idx) => (
          <li key={idx} className="flex items-center gap-2 leading-[36px] text-[#767676] text-[14px] font-nunito font-normal">
            <span className="leading-[36px] text-[#767676] text-[14px] font-nunito font-normal">/</span>
            <Link href={crumb.href}>{crumb.label}</Link>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
