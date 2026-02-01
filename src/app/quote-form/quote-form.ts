import { Component,  inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-quote-form',
  imports: [CommonModule, ReactiveFormsModule, QuoteForm],
  templateUrl: './quote-form.html',
  styleUrl: './quote-form.css',
})
export class QuoteForm {

  private fb = inject(FormBuilder);

  contactForm: FormGroup;

  constructor() {
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
