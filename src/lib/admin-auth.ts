const SESSION_KEY = 'shopcart_admin';

// Credentials from environment variables.
// Set ADMIN_EMAIL and ADMIN_PASSWORD in Vercel project settings.
// IMPORTANT: change these from the defaults — they were previously hardcoded
// in source code and are now exposed in git history.
const ADMIN_EMAIL = (typeof process !== 'undefined' && process.env?.ADMIN_EMAIL) || 'papilocostaa@gmail.com';
const ADMIN_PASSWORD = (typeof process !== 'undefined' && process.env?.ADMIN_PASSWORD) || 'hippo@12345';

export function adminLogin(email: string, password: string): boolean {
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    localStorage.setItem(SESSION_KEY, '1');
    return true;
  }
  return false;
}

export function adminLogout(): void {
  localStorage.removeItem(SESSION_KEY);
}

export function isAdminAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(SESSION_KEY) === '1';
}
