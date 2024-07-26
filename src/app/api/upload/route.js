import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/jwt';
import fs from 'fs';
import path from 'path';
import formidable from 'formidable';

const uploadDir = path.resolve('uploads');

export async function POST(req) {
  const form = new formidable.IncomingForm();
  form.uploadDir = uploadDir;
  form.keepExtensions = true;

  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        return reject(NextResponse.json({ message: 'File upload error' }, { status: 500 }));
      }

      const token = req.headers['authorization']?.split(' ')[1];
      if (!token || !verifyToken(token)) {
        return resolve(NextResponse.json({ message: 'Unauthorized' }, { status: 401 }));
      }

      const file = files.file[0];
      const fileUrl = `/uploads/${path.basename(file.filepath)}`;

      resolve(NextResponse.json({ fileUrl }));
    });
  });
}
