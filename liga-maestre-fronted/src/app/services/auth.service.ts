import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export type AuthUser = {
  _id: string;
  nombre: string;
  email: string;
  rol: 'admin' | 'user' | 'arbitro';
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<AuthUser> {
    return this.http
      .post<AuthUser>(`${this.baseUrl}/auth/login`, { email, password })
      .pipe(
        tap((u) => localStorage.setItem('auth_user', JSON.stringify(u)))
      );
  }

  logout() {
    localStorage.removeItem('auth_user');
  }

  get user(): AuthUser | null {
    const raw = localStorage.getItem('auth_user');
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  }

 
  getUser(): AuthUser | null {
    return this.user;
  }

  get rol(): string {
    return (this.user?.rol || '').toLowerCase().trim();
  }

  get isLoggedIn(): boolean {
    return !!this.user;
  }
}