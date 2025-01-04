export interface Experience {
  role: string
  company: string
  period: string
  description?: string
  technologies?: string[]
}

export interface SocialLink {
  platform: 'github' | 'linkedin' | 'twitter' | 'instagram'
  url: string
}

export interface ProfileData {
  name: string
  title?: string
  description: string
  imageUrl: string
  location?: string
  availability?: 'available' | 'unavailable' | 'limited'
  socials: SocialLink[]
  email: string
  cvUrl: string
  experiences: Experience[]
  skills?: string[]
}

export interface ConnectOption {
  label: string
  href: string
  variant?: 'default' | 'secondary' | 'outline'
}

