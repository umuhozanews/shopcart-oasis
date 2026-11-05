import { createAdminSession } from './admin-session';

const SESSION_KEY = 'shopcart_admin_session';

export function getAdminSessionToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(SESSION_KEY);
}

export async function adminLogin(email: string, password: string): Promise<boolean> {
  const { token } = await createAdminSession({ data: { email, password } });
  if (!token) return false;
  localStorage.setItem(SESSION_KEY, token);
  return true;
}

export function adminLogout(): void {
  if (typeof window !== 'undefined') localStorage.removeItem(SESSION_KEY);
}

export function isAdminAuthenticated(): boolean {
  return !!getAdminSessionToken();
}
