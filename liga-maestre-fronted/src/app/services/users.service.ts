import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export type User = {
  _id: string;
  nombre: string;
  email: string;
  rol: 'admin' | 'user' | 'arbitro';
  createdAt?: string;
};

@Injectable({ providedIn: 'root' })
export class UsersService {
  private readonly baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users`);
  }

 createUser(payload: { nombre: string; email: string; password: string; tipo: string }) {
  return this.http.post<User>(`${this.baseUrl}/users`, payload);
}
}
