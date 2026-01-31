import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  // Dependency Injection modern módon
  private fb = inject(FormBuilder);

  contactForm: FormGroup;

  constructor() {
    // A mintaüzenet definiálása
// A mintaüzenet frissítése
const pattern = `Tisztelt EB-Clean!

Szeretnék árajánlatot kérni egy családi ház napelem tisztítására Bakonyjákón. A rendszer 12 paneles.

Üdvözlettel: [név]
Tel: +36 
Email: 
`;

this.contactForm = this.fb.group({
  message: [pattern, [Validators.required, Validators.minLength(50)]]
});    // Form inicializálása a mintával

    this.contactForm = this.fb.group({
      message: [pattern, [Validators.required, Validators.minLength(20)]]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      console.log('Küldendő adatok:', this.contactForm.value.message);
      // Itt jöhet a text parsing vagy a beküldés
    }
  }
}
