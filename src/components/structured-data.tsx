import { marwanData } from '@/data'

const BASE_URL = 'https://marwanbaz.dev'

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Marwan Baz',
  alternateName: 'Marwan Bazghifan',
  jobTitle: 'Frontend Developer & Product Engineer',
  url: BASE_URL,
  image: `${BASE_URL}${marwanData.imageUrl}`,
  email: marwanData.email,
  sameAs: [
    marwanData.githubUrl,
    marwanData.linkedinUrl,
  ],
  knowsAbout: marwanData.skills,
  description: marwanData.description,
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
