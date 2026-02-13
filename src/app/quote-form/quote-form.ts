import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

declare var bootstrap: any;

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
  confirmationModal: any;
  isSubmitting = false;
  submissionStatus: 'success' | 'error' | null = null;
  confirmationData: { email?: string, phone?: string, message: string } | null = null;
  contactError: string | null = null;

  constructor() {
    this.contactForm = this.fb.group({
      message: ['', [Validators.required, Validators.minLength(20)]],
    });
  }

  ngOnInit() {
    this.http.get<{ quoteTemplateMessage: string }>('assets/data/messages.json').subscribe(data => {
      const message = data.quoteTemplateMessage;
      this.contactForm.get('message')?.setValue(message);
    });
    this.confirmationModal = new bootstrap.Modal(document.getElementById('confirmationModal'));
  }

  onSubmit() {
    this.submissionStatus = null;
    // this.contactError = null;

    // if (this.contactForm.invalid) {
    //   if (this.contactForm.get('email')?.hasError('email')) {
    //     this.contactError = 'Kérjük, adjon meg egy valós email címet.';
    //   } else {
    //     this.contactError = 'Kérjük, töltse ki a kötelező mezőket.';
    //   }
    //   return;
    // }

    const formValue = this.contactForm.value;
    const extractedContacts = this.extractContactInfo(formValue.message);

    const finalEmail = extractedContacts.email;
    const finalPhone = extractedContacts.phone;
    // const finalEmail = formValue.email || extractedContacts.email;
    // const finalPhone = formValue.phone || extractedContacts.phone;

    // if (!finalEmail && !finalPhone) {
    //   this.contactError = 'Kérjük, adja meg email címét vagy telefonszámát, hogy felvehessük Önnel a kapcsolatot.';
    //   return;
    // }

    this.confirmationData = {
      email: finalEmail,
      phone: finalPhone,
      message: formValue.message
    };

    this.confirmationModal.show();
  }

  sendRequest() {
    if (!this.confirmationData) {
      return;
    }

    this.isSubmitting = true;
    const apiUrl = 'https://4qnl1taa5i.execute-api.eu-central-1.amazonaws.com/prod/quote-requests';
    const requestBody = {
      email: this.confirmationData.email,
      phone: this.confirmationData.phone,
      message: this.confirmationData.message
    };

    this.http.post(apiUrl, requestBody).subscribe({
      next: () => {
        this.submissionStatus = 'success';
        this.isSubmitting = false;
        this.contactForm.reset();
      },
      error: () => {
        this.submissionStatus = 'error';
        this.isSubmitting = false;
      }
    });

  }

  private extractContactInfo(text: string): { email?: string, phone?: string } {
    const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi;
    const phoneRegex = /(\+?[0-9\s\-\/()]{8,})/gi;

    const emails = text.match(emailRegex);
    const phones = text.match(phoneRegex);

    return {
      email: emails ? emails[0] : undefined,
      phone: phones ? phones[0] : undefined
    };
  }
}
