import { NextRequest, NextResponse } from 'next/server'

const signInURL = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value

  if (!token) {
    return NextResponse.redirect(signInURL, {
      headers: {
        'Set-Cookie': `redirectTo=${request.url}; Path=/; HttpOnly; max-age=20;`,
      },
    }) // se nao estiver o token de acesso, redireciona o usuario para a tela de login
  }

  return NextResponse.next() // Se tiver o token nao faz nada, so continua o que o usuario esta fazendo
}

export const config = {
  matcher: '/memories/:path*',
}
