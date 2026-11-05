import { createServerFn } from '@tanstack/react-start';

const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;
const encoder = new TextEncoder();

function getAdminConfig() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  const secret = process.env.ADMIN_SESSION_SECRET || password;
  if (!email || !password || !secret) {
    throw new Error('Admin credentials are not configured on the server.');
  }
  return { email, password, secret };
}

function encodeBase64Url(value: Uint8Array) {
  let binary = '';
  value.forEach((byte) => { binary += String.fromCharCode(byte); });
  return btoa(binary).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

function decodeBase64Url(value: string) {
  const base64 = value.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat((4 - (value.length % 4)) % 4);
  const binary = atob(base64);
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

async function sign(payload: string, secret: string) {
  const key = await crypto.subtle.importKey(
    'raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'],
  );
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(payload));
  return encodeBase64Url(new Uint8Array(signature));
}

export async function verifyAdminSession(token: unknown): Promise<boolean> {
  if (typeof token !== 'string') return false;
  try {
    const { email, secret } = getAdminConfig();
    const [payload, signature, extra] = token.split('.');
    if (!payload || !signature || extra) return false;
    const expected = await sign(payload, secret);
    const actualBytes = decodeBase64Url(signature);
    const expectedBytes = decodeBase64Url(expected);
    if (actualBytes.length !== expectedBytes.length) return false;
    let mismatch = 0;
    for (let i = 0; i < actualBytes.length; i++) mismatch |= actualBytes[i] ^ expectedBytes[i];
    if (mismatch !== 0) return false;
    const session = JSON.parse(new TextDecoder().decode(decodeBase64Url(payload))) as { email?: string; exp?: number };
    return session.email === email && typeof session.exp === 'number' && session.exp > Date.now();
  } catch {
    return false;
  }
}

export const createAdminSession = createServerFn({ method: 'POST' })
  .inputValidator((data: { email: string; password: string }) => data)
  .handler(async ({ data }) => {
    const { email, password, secret } = getAdminConfig();
    if (data.email.trim().toLowerCase() !== email.trim().toLowerCase() || data.password !== password) {
      return { token: null };
    }
    const payload = encodeBase64Url(encoder.encode(JSON.stringify({ email, exp: Date.now() + SESSION_TTL_MS })));
    return { token: `${payload}.${await sign(payload, secret)}` };
  });
