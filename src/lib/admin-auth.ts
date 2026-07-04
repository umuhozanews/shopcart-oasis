const SESSION_KEY = 'shopcart_admin';
const CREDENTIALS = { email: 'papilocostaa@gmail.com', password: 'hippo@12345' };

export function adminLogin(email: string, password: string): boolean {
  if (email === CREDENTIALS.email && password === CREDENTIALS.password) {
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
