import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { of, delay } from 'rxjs';

declare var bootstrap: any;

@Component({
  selector: 'app-quote-form',
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './quote-form.html',
  styleUrl: './quote-form.css',
})
export class QuoteForm implements OnInit {

  user = signal('eros.balazs');
  domain = signal('eb-clean.hu');

  private fb = inject(FormBuilder);
  private http = inject(HttpClient);

  contactForm: FormGroup;
  confirmationModal: any;
  submissionStatus: 'waiting-for-input' | 'submitting'| 'missing-contact' | 'success' | 'error' = 'waiting-for-input' ;
  contactData: { email?: string, phone?: string, message: string } | null = null;

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
  }


  getMockData() {
    return of({ id: 1, name: 'Test Data' }).pipe(
      delay(3000) 
    );
  }

  onSubmit() {
    this.submissionStatus = 'waiting-for-input';

    const formValue = this.contactForm.value;
    const extractedContacts = this.extractContactInfo(formValue.message);

    const email = extractedContacts.email;
    const phone = extractedContacts.phone;

    console.log('email: ' + email);
    
    if (!email && !phone) {
      this.submissionStatus = 'missing-contact'
      return;
    }


    this.contactData = {
      email: email,
      phone: phone,
      message: formValue.message
    };

    // this.sendRequest();

    this.submissionStatus = 'error';

    // delay(3000);
    
    // this.submissionStatus = 'error'
  }

  sendRequest() {
    if (!this.contactData) {
      return;
    }

    this.submissionStatus = 'submitting'

    const apiUrl = 'https://4qnl1taa5i.execute-api.eu-central-1.amazonaws.com/prod/quote-requests';

    const wrongApiUrl = "https://wrongurl.asdf"

    const requestBody = {
      email: this.contactData.email,
      phone: this.contactData.phone,
      message: this.contactData.message
    };

    this.http.post(wrongApiUrl, requestBody).subscribe({
      next: () => {
        this.submissionStatus = 'success';
      },
      error: () => {
        this.submissionStatus = 'error';
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
