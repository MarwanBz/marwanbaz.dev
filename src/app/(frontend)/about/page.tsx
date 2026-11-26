import Image from "next/image";
import Link from "next/link";

import { CollaborateButton } from "@/components/collaborate-button";
import { profileData } from "@/data";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "About Me",
  description:
    "I tried more than 10 operating systems, from Windows 98 and XP to Kali Linux and macOS. This is my story, and what I build now with React and Next.js.",
  path: "/about",
});

const systems = [
  { name: "Windows 98, 2000 & XP", note: "tried to exploit the zero-days that didn't get patched" },
  { name: "Custom Windows 7", note: "tweaking" },
  { name: "Kali Linux", note: "tried it" },
  { name: "Ubuntu", note: "a while, especially in software engineering" },
  { name: "macOS", note: "where I finally settled down" },
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
            Hi, I am Marwan. My love for software took me from &quot;I wanna be
            working with computers&quot; to studying it in college, and to
            trying software, games, tweaking, everything I could get my hands
            on.
          </p>
        </div>
      </section>

      {/* A little history about me */}
      <section className="mt-16">
        <h2 className="text-sm font-semibold tracking-wide">
          A little history about me
        </h2>
        <div className="mt-3 space-y-4 text-base leading-relaxed text-muted-foreground">
          <p>
            I tried more than 10 OS versions between linux distros. I think I
            am the only person from Gen Z who tried Windows 98, Windows 2000
            and Windows XP, and I was just trying to know their zero day
            vulnerabilities that didn&apos;t get patched, so I can exploit
            them :D
          </p>
          <p>
            I also tried custom versions of Windows 7, and linux from Kali
            Linux to Ubuntu, especially when I got into software engineering.
            Currently I finally settled down on macOS. From that journey I
            learned a ton.
          </p>
          <p>
            I am just a techie who loves digital stuff, I love to try them.
            From time to time I try to do some OSS too, opening issues,
            enhancements, and PRs into open source projects.
          </p>
        </div>
      </section>

      {/* OSes I've tried */}
      <section className="mt-16">
        <h2 className="text-sm font-semibold tracking-wide">
          OSes I&apos;ve tried
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
          I&apos;m always up for working on new projects or just talking tech.
          Have something in mind?
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
