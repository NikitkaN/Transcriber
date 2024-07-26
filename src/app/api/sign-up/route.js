import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { createToken } from '@/lib/jwt';
import cookie from 'cookie';

const dataFilePath = path.resolve("./src/app/data.json");

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    
    const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
    
    if (data.users.find(user => user.email === email)) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    const user = { name, email, password };
    data.users.push(user);

    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));

    const token = createToken(user);

    const response = NextResponse.json({ message: 'User registered successfully' });
    response.headers.set('Set-Cookie', cookie.serialize('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      maxAge: 3600,
      path: '/'
    }));

    return response;
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}