import { defineEventHandler, createError, setHeader, sendStream } from 'h3';
import { getRouterParam } from 'h3';
import { createReadStream, existsSync } from 'fs';
import { join, resolve } from 'path';

const UPLOADS_DIR = process.env.UPLOADS_DIR ?? join(process.cwd(), 'data', 'uploads');

const MIME: Record<string, string> = {
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
  gif: 'image/gif',
};

export default defineEventHandler((event) => {
  const slug = getRouterParam(event, 'slug') ?? '';

  // Prevent path traversal attacks
  const filePath = resolve(join(UPLOADS_DIR, slug));
  if (!filePath.startsWith(resolve(UPLOADS_DIR))) {
    throw createError({ statusCode: 403, message: 'Forbidden' });
  }

  if (!existsSync(filePath)) {
    throw createError({ statusCode: 404, message: 'Not Found' });
  }

  const ext = slug.split('.').pop()?.toLowerCase() ?? '';
  setHeader(event, 'Content-Type', MIME[ext] ?? 'image/jpeg');
  setHeader(event, 'Cache-Control', 'public, max-age=31536000, immutable');

  return sendStream(event, createReadStream(filePath));
});
