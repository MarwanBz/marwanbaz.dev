"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ThemeToggle } from "@/components/components_theme-toggle";

const navItems = [
  { name: "Work", href: "/work" },
  { name: "Writing", href: "/blog" },
  { name: "About", href: "/about" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="mx-auto flex w-full max-w-2xl items-center justify-between px-6 py-8">
      <Link
        href="/"
        className="font-medium tracking-tight transition-colors hover:text-blue-600 dark:hover:text-blue-400"
      >
        Marwan Baz
      </Link>
      <nav className="flex items-center gap-5">
        {navItems.map((item) => {
          const active =
            pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${
                active ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {item.name}
            </Link>
          );
        })}
        <ThemeToggle />
      </nav>
    </header>
  );
}
