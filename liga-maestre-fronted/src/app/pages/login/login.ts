import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  email = '';
  password = '';
  errorMsg = '';
  loading = false;

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit(event: Event): void {
    event.preventDefault();
    this.errorMsg = '';

    if (!this.email || !this.password) {
      this.errorMsg = 'Completa todos los campos.';
      return;
    }

    this.loading = true;

    this.auth
      .login(this.email.trim(), this.password)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (user) => {
          const rol = String(user?.rol || '').toLowerCase().trim();

          if (rol === 'admin') {
            this.router.navigateByUrl('/admin-partidos');
          } else if (rol === 'arbitro') {
            this.router.navigateByUrl('/mis-partidos');
          } else {
            this.router.navigateByUrl('/mis-partidos');
          }
        },
        error: (err) => {
          this.errorMsg = err?.error?.message || 'Error al iniciar sesión';
        },
      });
  }
}