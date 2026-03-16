import { profileData } from '@/data'
import { SITE_URL, absoluteUrl } from '@/lib/site'

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Marwan Baz',
  alternateName: 'Marwan Bazghifan',
  jobTitle: 'Frontend Developer & Product Engineer',
  url: SITE_URL,
  image: absoluteUrl(profileData.imageUrl),
  email: profileData.email,
  sameAs: [
    profileData.githubUrl,
    profileData.linkedinUrl,
  ],
  knowsAbout: profileData.skills,
  description: profileData.description,
}

export function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(personSchema),
      }}
    />
  )
}
