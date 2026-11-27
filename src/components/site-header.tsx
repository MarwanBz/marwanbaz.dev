"use client";

import Image from "next/image";
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
        className="flex items-center gap-2.5 font-medium tracking-tight transition-colors hover:text-blue-600 dark:hover:text-blue-400"
      >
        <Image
          src="/assets/baz-logo.png"
          alt=""
          width={24}
          height={24}
          priority
          className="size-6 rounded-[6px] object-contain"
        />
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
