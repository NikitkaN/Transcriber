import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.resolve("./src/app/data.json");

export async function POST(req) {
  const { name, email, password } = await req.json();
  
  const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
  
  if (data.users.find(user => user.email === email)) {
    return NextResponse.json({ message: 'User already exists' }, { status: 400 });
  }
  
  data.users.push({ name, email, password });
  
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
  
  return NextResponse.json({ message: 'User registered successfully' });
}