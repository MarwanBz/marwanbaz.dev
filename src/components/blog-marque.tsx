"use client"

import { Calendar, Clock, ExternalLink } from "lucide-react"
import { useEffect, useRef, useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { CustomCard } from "./custom-card"
import Link from "next/link"

interface RSSItem {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  category: string;
}

interface BlogPost {
  title: string
  date: string
  readTime: string
  href: string
  tags: string[]
}

// function to parse RSS => "Really Simple Syndication" XML data 
async function parseRSSFeed(xml: string): Promise<BlogPost[]> {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xml, "text/xml");
  const items = xmlDoc.querySelectorAll("item")

  return Array.from(items).map(item => {
    // get all category tags for this item 
    const categories = Array.from(item.getElementsByTagName("category")).map(
      cat => cat.textContent || ""
    ).filter(Boolean)

    // estimate time to read calculation
    const description = item.querySelector("description")?.textContent || ""
    const wordCount = description.split(/\s/).length
    const readTimeMinutes = Math.max(1, Math.ceil(wordCount / 200))
    
    return {
      title: item.querySelector("title")?.textContent || "",
      date: new Date(item.querySelector("pubDate")?.textContent || "").toISOString().split("T")[0],
      readTime: `${readTimeMinutes} min read`,
      href: item.querySelector("link")?.textContent || "",
      tags: categories.slice(0,3) //3 tags
    }
  })
}

// function to fetch RSS feed 
async function fetchBlogPosts(): Promise<BlogPost[]> {
  try {
    const response = await fetch("https://blog.marwanbaz.dev/feed.xml")
    if (!response.ok) {
      throw new Error("Failed to fetch RSS feed")
    }

    const xmlText = await response.text()
    return await parseRSSFeed(xmlText)
  } catch (error) {
    console.log("error couldn't'fetch RSS feed",error);
    return []
  }
}

// const latestPosts: BlogPost[] = [
//   {
//     title: "Building Modern Web Applications",
//     date: "2023-12-30",
//     readTime: "5 min read",
//     href: "#",
//     tags: ["Web Dev", "React", "Next.js"],
//   },
//   {
//     title: "The Future of Web Development",
//     date: "2023-12-28",
//     readTime: "7 min read",
//     href: "#",
//     tags: ["Trends", "AI", "WebAssembly"],
//   },
//   {
//     title: "Mastering React Patterns",
//     date: "2023-12-25",
//     readTime: "6 min read",
//     href: "#",
//     tags: ["React", "Patterns", "Performance"],
//   },
// ]

export function BlogComponent() {
  
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isHovered, setIsHovered] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>()

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setIsLoading(true)
        const fetchedPosts = await fetchBlogPosts()
        setPosts(fetchedPosts)
      } catch (err) {
        setError('Failed to load blog posts')
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    loadPosts()
  }, [])
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollElement = scrollRef.current
    if (!scrollElement) return

    const scrollWidth = scrollElement.scrollWidth
    const clientWidth = scrollElement.clientWidth

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
  }, [isHovered])

  return (
    <CustomCard
      className="overflow-hidden rounded-3xl  bg p-6"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold ">Latest Articles</h2>
        <Link
          href="https://blog.marwanbaz.dev"
          className="group flex items-center text-sm hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit Blog
          <ExternalLink className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
      <div className="relative overflow-hidden">
        <div ref={scrollRef} className="flex items-center gap-6 py-2 overflow-x-hidden">
          {[...posts, ...posts].map((post, index) => (
            <Link key={index} href={post.href} target="_blank" rel="noopener noreferrer" className="group flex-shrink-0">
              <Card className="w-80 overflow-hidden rounded-2xl border border-blue-500/20  transition-all  group-hover:shadow-lg group-hover:scale-[1.02]">
                <div className="p-4">
                  <div className="mb-2 flex items-center justify-between text-sm text-gray-400">
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-4 w-4" />
                      {post.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-1 h-4 w-4" />
                      {post.readTime}
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
      </div>
    </CustomCard>
  )
}

