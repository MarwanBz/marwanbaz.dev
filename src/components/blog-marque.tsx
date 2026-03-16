"use client"

import { Calendar, Clock, ExternalLink } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { CustomCard } from "./custom-card"
import Link from "next/link"
import { formatDateLabel } from "@/lib/date"
import type { CmsPost } from "@/lib/cms/types"

export function BlogComponent({ posts }: { posts: CmsPost[] }) {
  const [isHovered, setIsHovered] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const shouldLoopPosts = posts.length > 1
  const renderedPosts = shouldLoopPosts ? [...posts, ...posts] : posts

  useEffect(() => {
    if (!shouldLoopPosts) return

    const scrollElement = scrollRef.current
    if (!scrollElement) return

    const scrollWidth = scrollElement.scrollWidth

    let animationId: number

    const scroll = () => {
      if (isHovered || !scrollElement) return
      scrollElement.scrollLeft += 1
      if (scrollElement.scrollLeft >= scrollWidth / 2) {
        scrollElement.scrollLeft = 0
      }
      animationId = requestAnimationFrame(scroll)
    }

    animationId = requestAnimationFrame(scroll)

    return () => cancelAnimationFrame(animationId)
  }, [isHovered, shouldLoopPosts])

  return (
    <CustomCard
      className="overflow-hidden rounded-3xl  bg p-6"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold ">Latest Articles</h2>
        <Link
          href="/blog"
          className="group flex items-center text-sm hover:underline"
        >
          Visit Blog
          <ExternalLink className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
      <div className="relative overflow-hidden">
        <div ref={scrollRef} className="flex items-center gap-6 py-2 overflow-x-hidden">
          {renderedPosts.map((post, index) => (
            <Link key={`${post.slug}-${index}`} href={post.url} className="group flex-shrink-0">
              <Card className="w-80 overflow-hidden rounded-2xl border border-blue-500/20  transition-all  group-hover:shadow-lg group-hover:scale-[1.02]">
                <div className="p-4">
                  <div className="mb-2 flex items-center justify-between text-sm text-gray-400">
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-4 w-4" />
                      {formatDateLabel(post.date, "MMM d, yyyy")}
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-1 h-4 w-4" />
                      {post.readingTime.text}
                    </div>
                  </div>
                  <h3 className="mb-2 text-lg font-semibold   line-clamp-2">
                    {post.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="outline" 
                    className="text-gray-600 border-gray-300 dark:text-gray-400 dark:border-gray-700">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
        {posts.length === 0 && (
          <p className="py-6 text-sm text-muted-foreground">
            No posts published yet.
          </p>
        )}
      </div>
    </CustomCard>
  )
}
