import { NextResponse } from 'next/server';
import cookie from 'cookie';

export async function GET() {
  const response = NextResponse.json({ message: 'Logout successful' });
  response.headers.set('Set-Cookie', cookie.serialize('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    maxAge: -1,
    path: '/'
  }));

  return response;
}