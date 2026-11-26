import Image from "next/image";
import Link from "next/link";

import { CollaborateButton } from "@/components/collaborate-button";
import { profileData } from "@/data";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "About Me | Frontend Developer",
  description:
    "Learn more about Marwan Baz, a Frontend Developer with a product engineering mindset. Passionate about web development, UI design, animation, and creating exceptional user experiences.",
  path: "/about",
});

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
            Frontend developer with a product mindset.
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Hi, I&apos;m Marwan. I&apos;m a frontend developer who loves
            creating beautiful, fast, and accessible web interfaces — turning
            complex problems into simple, elegant solutions.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            My journey in tech has taken me through product teams, agencies, and
            freelance work — from design systems to trilingual marketplaces. I
            care about the craft: typography, motion, and the small details that
            make software feel good to use.
          </p>
        </div>
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
