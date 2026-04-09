import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class RegisterComponent {
  nombre = '';
  email = '';
  password = '';
  rol: 'admin' | 'user' | 'arbitro' = 'user';

  loading = false;
  okMsg = '';
  errorMsg = '';

  constructor(private usersService: UsersService) {}

  onSubmit(e: Event) {
    e.preventDefault();

    console.log('✅ submit', { nombre: this.nombre, email: this.email, rol: this.rol });

    this.okMsg = '';
    this.errorMsg = '';
    this.loading = true;

    // OJO: tu backend en users.js lee "tipo", no "rol"
    // Así que enviamos "tipo" para que lo guarde bien.
    const payload = {
      nombre: this.nombre,
      email: this.email,
      password: this.password,
      tipo: this.rol, // <- clave importante
    };

    this.usersService.createUser(payload as any).subscribe({
      next: () => {
        this.loading = false;
        this.okMsg = '✅ Usuario creado';

        this.nombre = '';
        this.email = '';
        this.password = '';
        this.rol = 'user';
      },
      error: (err) => {
        this.loading = false;
        this.errorMsg = err?.error?.message || 'Error creando usuario';
        console.error('❌ error', err);
      },
    });
  }
}
