import { User, LoginCredentials, RegisterData } from '../types/auth';

// Simulated user storage
let users = [
  {
    id: 'admin',
    email: 'admin',
    name: 'SAV Admin',
    password: 'admin',
    role: 'sav' as const
  }
];

export const authService = {
  login: async (credentials: LoginCredentials): Promise<User> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = users.find(u => 
          u.email === credentials.email && u.password === credentials.password
        );
        
        if (user) {
          const { password, ...userWithoutPassword } = user;
          resolve(userWithoutPassword);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 500);
    });
  },

  register: async (data: RegisterData): Promise<User> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (users.some(u => u.email === data.email)) {
          reject(new Error('Email already exists'));
          return;
        }

        const newUser = {
          id: `user${users.length + 1}`,
          email: data.email,
          name: data.name,
          password: data.password,
          role: 'client' as const
        };

        users.push(newUser);
        const { password, ...userWithoutPassword } = newUser;
        resolve(userWithoutPassword);
      }, 500);
    });
  },

  logout: async (): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(resolve, 300);
    });
  }
};