import Image from "next/image";
import Link from "next/link";

import { CollaborateButton } from "@/components/collaborate-button";
import { profileData } from "@/data";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "About Me | Frontend Developer",
  description:
    "The story behind the code — Marwan Baz, a frontend developer who loves software systems: from hunting unpatched zero-days on old Windows to settling on macOS.",
  path: "/about",
});

const systems = [
  { name: "Windows 98 & 2000", note: "hunting zero-days that never got patched" },
  { name: "Custom Windows 7 builds", note: "the tweaking years" },
  { name: "Kali Linux", note: "the curiosity phase" },
  { name: "Ubuntu", note: "my companion through software engineering" },
  { name: "macOS", note: "where I finally settled" },
];

export default function AboutPage() {
  const { experiences, skills } = profileData;

  return (
    <main className="mx-auto w-full max-w-2xl px-6 pb-24">
      {/* Intro */}
      <section className="flex flex-col gap-8 sm:flex-row sm:items-start">
        <Image
          src={profileData.imageUrl}
          alt="Portrait of Marwan Baz"
          width={128}
          height={128}
          priority
          className="size-32 shrink-0 rounded-full object-cover"
        />
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            I love software systems.
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Hi, I&apos;m Marwan. That love took me from &quot;I want to work
            with computers&quot; to studying software engineering in college —
            and to trying everything I could get my hands on: games, tweaks,
            and breaking things to see how they work.
          </p>
        </div>
      </section>

      {/* My story */}
      <section className="mt-16">
        <h2 className="text-sm font-semibold tracking-wide">My story</h2>
        <div className="mt-3 space-y-4 text-base leading-relaxed text-muted-foreground">
          <p>
            I&apos;ve tried more than 10 operating systems. I&apos;m probably
            the only Gen Z who has actually used Windows 98 and Windows 2000 —
            I just wanted to find the zero-days that never got patched and
            exploit them (for the fun of it, I promise).
          </p>
          <p>
            From there I went through custom Windows 7 builds, a stretch on
            Kali Linux, and a long run on Ubuntu — especially once I got into
            software engineering. These days I&apos;ve finally settled on
            macOS, and that whole journey taught me a ton.
          </p>
          <p>
            I&apos;m just a techie who loves digital stuff. I love trying it.
          </p>
        </div>
      </section>

      {/* Systems I've lived in */}
      <section className="mt-16">
        <h2 className="text-sm font-semibold tracking-wide">
          Systems I&apos;ve lived in
        </h2>
        <ul className="mt-3">
          {systems.map((system) => (
            <li
              key={system.name}
              className="flex flex-wrap items-baseline justify-between gap-x-4 border-t border-border py-3 last:border-b"
            >
              <span className="font-medium">{system.name}</span>
              <span className="text-sm text-muted-foreground">
                {system.note}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Experience */}
      <section className="mt-16">
        <h2 className="text-sm font-semibold tracking-wide">Experience</h2>
        <ul className="mt-3">
          {experiences.map((experience) => (
            <li
              key={`${experience.company}-${experience.period}`}
              className="border-t border-border py-5 last:border-b"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="font-medium">
                  {experience.role} · {experience.company}
                </h3>
                <span className="text-sm text-muted-foreground">
                  {experience.period}
                </span>
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {experience.description}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* Stack */}
      <section className="mt-16">
        <h2 className="text-sm font-semibold tracking-wide">Stack</h2>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          {skills.slice(0, 12).join(" · ")}
        </p>
      </section>

      {/* Connect */}
      <section className="mt-16">
        <h2 className="text-sm font-semibold tracking-wide">Let&apos;s connect</h2>
        <p className="mt-3 max-w-md text-base leading-relaxed text-muted-foreground">
          I&apos;m always excited to collaborate on new projects or talk about
          the latest in web development. Have something in mind?
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <CollaborateButton />
          <Link
            href="/work"
            className="inline-flex items-center rounded-md border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            View my work
          </Link>
        </div>
      </section>
    </main>
  );
}
