import { ImageResponse } from 'next/og'

export const alt = 'Marwan Baz - Frontend Developer & Product Engineer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
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
          backgroundColor: '#000',
          backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          fontSize: 60,
          fontWeight: 700,
          color: 'white',
        }}
      >
        <div style={{ marginBottom: '20px' }}>Marwan Baz</div>
        <div style={{ fontSize: '32px', fontWeight: 400, opacity: 0.9 }}>
          Frontend Developer & Product Engineer
        </div>
        <div style={{ marginTop: '40px', fontSize: '24px', opacity: 0.8 }}>
          React • Next.js • TypeScript
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
