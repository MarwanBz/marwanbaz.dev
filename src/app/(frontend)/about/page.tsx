import { AboutClient } from './about-client'
import { createPageMetadata } from '@/lib/seo'

export const metadata = createPageMetadata({
  title: 'About Me | Frontend Developer',
  description: 'Learn more about Marwan Baz, a Frontend Developer with a product engineering mindset. Passionate about web development, UI design, animation, and creating exceptional user experiences.',
  path: '/about',
})

export default function AboutPage() {
  return <AboutClient />
}
