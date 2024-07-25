import { NextResponse } from 'next/server';
const Busboy = require('busboy');
import fs from 'fs';
import path from 'path';
import { Readable } from 'stream';

export async function POST(request) {
  return new Promise((resolve, reject) => {
    const busboy = new Busboy({ headers: request.headers });
    const filePath = path.join(process.cwd(), './public/uploads');
    const chunks = [];
    let fileName = '';

    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
      if (mimetype !== 'video/mp4' && mimetype !== 'audio/mpeg') {
        reject(new Error('Invalid file type'));
        return;
      }

      fileName = filename;
      file.pipe(fs.createWriteStream(path.join(filePath, filename)));
      file.on('data', (data) => {
        chunks.push(data);
      });
    });

    busboy.on('finish', () => {
      if (!fileName) {
        reject(new Error('No file uploaded'));
        return;
      }

      const fileSize = chunks.reduce((acc, chunk) => acc + chunk.length, 0);
      if (fileSize > 50 * 1024 * 1024) { // 50 MB
        fs.unlink(path.join(filePath, fileName), (err) => {
          if (err) console.error("Error deleting file:", err);
        });
        reject(new Error('File size exceeds limit'));
        return;
      }

      resolve(NextResponse.json({
        message: 'File uploaded successfully',
        file_url: `./public/uploads/${fileName}`,
      }));
    });

    const bodyStream = Readable.from(request.body);
    bodyStream.pipe(busboy);
  });
}