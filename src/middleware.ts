import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Only protect /studio routes
  if (!pathname.startsWith('/studio')) {
    return NextResponse.next()
  }

  const expectedUser = process.env.STUDIO_USERNAME ?? 'barbelladmin'
  const expectedPass = process.env.STUDIO_PASSWORD ?? 'Gamecocks1!'

  const authHeader = request.headers.get('authorization')

  if (authHeader) {
    const [scheme, encoded] = authHeader.split(' ')
    if (scheme === 'Basic' && encoded) {
      const decoded = Buffer.from(encoded, 'base64').toString('utf-8')
      const [user, ...passParts] = decoded.split(':')
      const pass = passParts.join(':') // handle colons in password

      if (user === expectedUser && pass === expectedPass) {
        return NextResponse.next()
      }
    }
  }

  return new NextResponse('Unauthorized', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Barbell Admin", charset="UTF-8"',
    },
  })
}

export const config = {
  matcher: '/studio/:path*',
}
