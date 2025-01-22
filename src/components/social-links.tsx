import { Button } from "@/components/ui/button"
import { LucideIcon, } from 'lucide-react'

interface SocialLink {
  icon: LucideIcon
  url: string
  label: string
}

interface SocialLinksProps {
  links: SocialLink[]
}

export function SocialLinks({ links }: SocialLinksProps) {
  if (!links || links.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {links.map((link, index) => (
        <Button
          key={index}
          variant="outline"
          size="icon"
          asChild
          className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300 w-24 h-24"
        >
          <a href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.label} className="w-24 h-24">
            <link.icon className="!h-10 !w-10" />
          </a>
        </Button>
      ))}
    </div>
  )
}