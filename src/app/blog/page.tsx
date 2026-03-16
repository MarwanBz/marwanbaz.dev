import { getPosts } from '@/lib/cms/strapi'
import { formatDateLabel } from '@/lib/date'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read my latest thoughts on web development, React, Next.js, and more.',
}

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <main className="container mx-auto max-w-4xl px-4 pb-24 pt-36">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Blog</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          This is my space on the internet where I share my weird thoughts, opinions, principles, learnings, interests, and anything in between.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        {posts.map((post) => (
          <article key={post.slug} className="group">
            <Link href={post.url} className="block">
              <div className="rounded-2xl border border-border/50 p-6 transition-all duration-300 hover:border-border hover:bg-accent/30 hover:shadow-lg">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <time dateTime={post.date}>
                    {formatDateLabel(post.date)}
                  </time>
                  <span>·</span>
                  <span>{post.readingTime.text}</span>
                </div>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight group-hover:text-primary transition-colors">
                  {post.title}
                </h2>
                <p className="mt-2 text-muted-foreground line-clamp-2">
                  {post.summary}
                </p>
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
              </div>
            </Link>
          </article>
        ))}
      </div>

      {posts.length === 0 && (
        <p className="text-center text-muted-foreground">No posts yet. Check back soon!</p>
      )}
    </main>
  )
}
