import { allPosts } from 'contentlayer/generated'
import { format, parseISO } from 'date-fns'
import { useMDXComponent } from 'next-contentlayer2/hooks'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image, { ImageProps } from 'next/image'
import type { Metadata } from 'next'
import { ArrowLeft } from 'lucide-react'
import { MatrixRain } from '@/components/matrix-rain'

export async function generateStaticParams() {
  return allPosts
    .filter((post) => !post.draft)
    .map((post) => ({ slug: post.slug }))
}

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata | undefined> {
  const params = await props.params
  const post = allPosts.find((p) => p.slug === params.slug)
  if (!post) return

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: 'article',
      publishedTime: post.date,
      url: `https://marwanbaz.dev/blog/${post.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
    },
  }
}

const components = {
  MatrixRain,
  img: (props: ImageProps) => (
    <Image
      sizes="100vw"
      style={{ width: '100%', height: 'auto' }}
      width={1200}
      height={630}
      {...props}
      alt={props.alt || ''}
    />
  ),
}

function MDXContent({ code }: { code: string }) {
  const Component = useMDXComponent(code)
  return <Component components={components} />
}

export default async function BlogPostPage(
  props: { params: Promise<{ slug: string }> }
) {
  const params = await props.params
  const post = allPosts.find((p) => p.slug === params.slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="container mx-auto max-w-3xl px-4 pb-24 pt-36">
      <Link
        href="/blog"
        className="group mb-10 flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Back to Blog
      </Link>

      <article>
        <header className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {post.title}
          </h1>
          <div className="mt-4 flex items-center gap-3 text-sm text-muted-foreground">
            <time dateTime={post.date}>
              {format(parseISO(post.date), 'MMMM d, yyyy')}
            </time>
            <span>·</span>
            <span>{post.readingTime.text}</span>
          </div>
          {post.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border/60 px-3 py-1 text-xs text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:scroll-mt-24 prose-headings:font-semibold prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-code:rounded prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm prose-pre:rounded-xl prose-pre:border prose-pre:border-border/50 prose-img:rounded-xl">
          <MDXContent code={post.body.code} />
        </div>
      </article>
    </main>
  )
}
