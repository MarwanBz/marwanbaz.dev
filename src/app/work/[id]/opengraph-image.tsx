import { ImageResponse } from 'next/og'
import { projects } from '@/data'

export const alt = 'Project'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

interface Props {
  params: Promise<{ id: string }>
}

export default async function Image({ params }: Props) {
  const { id } = await params
  const project = projects.find(p => p.id === parseInt(id))

  const summary = project?.summary || ''
  const truncatedSummary = summary.length > 100 ? summary.slice(0, 100) + '...' : summary

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0a0a0a',
          backgroundImage: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
          color: 'white',
          padding: '60px',
        }}
      >
        <div style={{ fontSize: '48px', fontWeight: 700, marginBottom: '20px' }}>
          {project?.title || 'Project'}
        </div>
        <div style={{ fontSize: '24px', opacity: 0.8, marginBottom: '30px' }}>
          {truncatedSummary}
        </div>
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {project?.technologies?.slice(0, 4).map(tech => (
            <span
              key={tech}
              style={{
                padding: '8px 16px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '20px',
                fontSize: '18px',
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    ),
    { ...size }
  )
}
