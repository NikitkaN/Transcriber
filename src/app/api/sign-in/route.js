import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.resolve('./src/app/data.json');

export async function POST(req) {
  const { email, password } = await req.json();
  
  const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
  
  const user = data.users.find(user => user.email === email && user.password === password);
  
  if (user) {
    return NextResponse.json({ message: 'Login successful' });
  } else {
    return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
  }
}