import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { createToken } from '@/lib/jwt';
import cookie from 'cookie';

const dataFilePath = path.resolve('./src/app/data.json');

export async function POST(req) {
  try {
    const { email, password } = await req.json();
  
    const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
  
    const user = data.users.find(user => user.email === email && user.password === password);
  
    if (user) {
      const token = createToken(user);

      const response = NextResponse.json({ message: 'Login successful' });
      response.headers.set('Set-Cookie', cookie.serialize('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        maxAge: 3600,
        path: '/'
      }));

      return response;
    } else {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
  
}