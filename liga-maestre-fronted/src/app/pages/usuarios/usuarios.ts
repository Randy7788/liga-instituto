import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UsersService, User } from '../../services/users.service';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css',
})
export class UsuariosComponent implements OnInit {
  users: User[] = [];
  loading = false;
  error = '';

  constructor(private usersService: UsersService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.error = '';

    this.usersService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = err?.error?.message ?? 'Error cargando usuarios';
        this.loading = false;
      },
    });
  }

  recargar(): void {
    this.loadUsers();
  }

  irARegistro(): void {
    this.router.navigate(['/registro']);
  }
}
