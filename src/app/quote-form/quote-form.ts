import { Component,  inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-quote-form',
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './quote-form.html',
  styleUrl: './quote-form.css',
})
export class QuoteForm implements OnInit {

  private fb = inject(FormBuilder);
  private http = inject(HttpClient);

  contactForm: FormGroup;

  constructor() {
    this.contactForm = this.fb.group({
      message: ['', [Validators.required, Validators.minLength(20)]],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['']
    });
  }

  ngOnInit() {
    this.http.get<{quoteTemplateMessage: string}>('assets/data/messages.json').subscribe(data => {
      const message = data.quoteTemplateMessage; 
      this.contactForm.get('message')?.setValue(message);
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      console.log('Küldendő adatok:', this.contactForm.value);
      // Itt jöhet a text parsing vagy a beküldés
    }
  }
}
