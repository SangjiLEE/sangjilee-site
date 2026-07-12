"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export interface NavItem {
  href: string;
  label: string;
}

export function NavLinks({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <>
      {items.map((n) => {
        const active =
          pathname === n.href || pathname.startsWith(`${n.href}/`);
        return (
          <Link
            key={n.href}
            href={n.href}
            className={
              active
                ? "rounded-full bg-parchment px-3 py-1 font-semibold text-ink"
                : "px-1 text-ink-80 hover:text-action"
            }
          >
            {n.label}
          </Link>
        );
      })}
    </>
  );
}
