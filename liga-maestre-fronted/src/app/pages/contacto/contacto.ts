import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contacto.html',
  styleUrl: './contacto.css',
})
export class ContactoComponent {
  enviado = false;

  onSubmit(event: Event) {
    event.preventDefault();
    this.enviado = true;

    const form = event.target as HTMLFormElement | null;
    form?.reset();

    window.setTimeout(() => {
      this.enviado = false;
    }, 4000);
  }
}
