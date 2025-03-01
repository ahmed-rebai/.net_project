export interface User {
  id: string;
  email: string;
  name: string;
  role: 'client' | 'sav';
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
  phone: string;
}