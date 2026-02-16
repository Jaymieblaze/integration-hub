import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const source = searchParams.get('source');
    const dest = searchParams.get('dest');

    if (!source || !dest) {
      return new Response('Missing source or dest parameter', { status: 400 });
    }

    return new ImageResponse(
      (
        <div
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'system-ui, sans-serif',
            position: 'relative',
          }}
        >
          {/* Background pattern */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              opacity: 0.1,
              background: 'radial-gradient(circle at 20% 50%, white 0%, transparent 50%), radial-gradient(circle at 80% 80%, white 0%, transparent 50%)',
            }}
          />

          {/* Main content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '60px',
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '24px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              maxWidth: '1000px',
              margin: '0 80px',
            }}
          >
            {/* Logo section */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '40px',
                marginBottom: '40px',
              }}
            >
              {/* Source app */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    width: '120px',
                    height: '120px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    borderRadius: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '60px',
                    fontWeight: 'bold',
                    color: 'white',
                  }}
                >
                  {source.charAt(0).toUpperCase()}
                </div>
                <div
                  style={{
                    marginTop: '16px',
                    fontSize: '32px',
                    fontWeight: '600',
                    color: '#1f2937',
                  }}
                >
                  {source}
                </div>
              </div>

              {/* Arrow */}
              <div
                style={{
                  fontSize: '80px',
                  color: '#667eea',
                  fontWeight: 'bold',
                }}
              >
                →
              </div>

              {/* Destination app */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    width: '120px',
                    height: '120px',
                    background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                    borderRadius: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '60px',
                    fontWeight: 'bold',
                    color: 'white',
                  }}
                >
                  {dest.charAt(0).toUpperCase()}
                </div>
                <div
                  style={{
                    marginTop: '16px',
                    fontSize: '32px',
                    fontWeight: '600',
                    color: '#1f2937',
                  }}
                >
                  {dest}
                </div>
              </div>
            </div>

            {/* Title */}
            <div
              style={{
                fontSize: '48px',
                fontWeight: 'bold',
                color: '#1f2937',
                textAlign: 'center',
                marginBottom: '20px',
              }}
            >
              Integration Guide
            </div>

            {/* Subtitle */}
            <div
              style={{
                fontSize: '28px',
                color: '#6b7280',
                textAlign: 'center',
              }}
            >
              Connect {source} to {dest} in minutes
            </div>
          </div>

          {/* Footer branding */}
          <div
            style={{
              position: 'absolute',
              bottom: '40px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              color: 'white',
              fontSize: '24px',
              fontWeight: '600',
            }}
          >
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                padding: '8px 16px',
                borderRadius: '8px',
                backdropFilter: 'blur(10px)',
              }}
            >
              IntegrationHub
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    console.error('Error generating OG image:', error);
    return new Response('Failed to generate image', { status: 500 });
  }
}
