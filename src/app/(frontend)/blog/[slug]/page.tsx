import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowLeft } from 'lucide-react'
import { RemoteMdx } from '@/components/remote-mdx'
import { getPostBySlug } from '@/lib/cms/payload'
import { formatDateLabel } from '@/lib/date'
import { absoluteUrl } from '@/lib/site'

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata | undefined> {
  const params = await props.params
  const post = await getPostBySlug(params.slug)
  if (!post) return

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: 'article',
      publishedTime: post.date,
      url: absoluteUrl(`/blog/${post.slug}`),
      images: post.coverImage
        ? [
            {
              url: absoluteUrl(post.coverImage),
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
      images: post.coverImage ? [absoluteUrl(post.coverImage)] : [],
    },
  }
}

export default async function BlogPostPage(
  props: { params: Promise<{ slug: string }> }
) {
  const params = await props.params
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="mx-auto w-full max-w-2xl px-6 pb-24">
      <Link
        href="/blog"
        className="group mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-blue-600 dark:hover:text-blue-400"
      >
        <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
        Writing
      </Link>

      <article className="mt-8">
        <header>
          <h1 className="text-3xl font-semibold tracking-tight">
            {post.title}
          </h1>
          <div className="mt-3 flex items-center gap-3 text-sm text-muted-foreground">
            <time dateTime={post.date}>
              {formatDateLabel(post.date)}
            </time>
            <span>·</span>
            <span>{post.readingTime.text}</span>
          </div>
          {post.tags.length > 0 && (
            <p className="mt-3 text-xs text-muted-foreground/70">
              {post.tags.join(" · ")}
            </p>
          )}
        </header>

        <div className="prose prose-neutral dark:prose-invert mt-8 max-w-none prose-headings:scroll-mt-24 prose-headings:font-semibold prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline dark:prose-a:text-blue-400 prose-code:rounded prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm prose-pre:rounded-xl prose-pre:border prose-pre:border-border/50 prose-img:rounded-xl">
          <RemoteMdx source={post.bodyMdx} />
        </div>
      </article>
    </main>
  )
}
