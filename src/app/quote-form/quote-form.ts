import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { of, delay } from 'rxjs';
import { HttpClient } from '@angular/common/http'; 
import { email } from '@angular/forms/signals';

declare var grecaptcha: any;

@Component({
  selector: 'app-quote-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './quote-form.html',
  styleUrl: './quote-form.css',
})
export class QuoteForm implements OnInit {

  user = signal('eros.balazs');
  domain = signal('eb-clean.hu');
  state = signal<'idle' | 'submitting' | 'missing-contact'|'invalid-contact' | 'success' | 'error'>('idle');
 
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);

  contactForm: FormGroup;
  confirmationModal: any;
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

    const formValue = this.contactForm.value;
    const extractedContacts = this.extractContactInfo(formValue.message);

    const email = extractedContacts.email;
    const phone = extractedContacts.phone;

    console.log('email: ' + email);
    console.log('phone: ' + phone);
    
    if (!this.isValidContactData(email, phone)) {
      this.state.set('missing-contact');
      return;
    }

    this.contactData = {
      email: email,
      phone: phone,
      message: formValue.message
    };

    this.sendRequest();
  }

  isValidContactData(email?: string, phone?: string): boolean {

    const hasEmail = !!email;
    const hasPhone = !!phone;

    if(hasEmail && hasPhone)
      return this.isValidEmail(email) || this.isValidPhone(phone)

    if(hasEmail)
     return this.isValidEmail(email)

    if(hasPhone)
      return this.isValidPhone(phone)

      return false
  }

  isValidEmail(email?: string) : boolean{
   return  !!email && (email != 'szabo.janos@emailcim.hu')
  }

  isValidPhone(phone?: string): boolean {
    const normalizedPhone = phone?.replace(/\s+/g, "");
    return !!normalizedPhone && normalizedPhone !== '+36201234567';
  }  

  sendRequest() {
    if (!this.contactData) {
      return;
    }

    this.state.set('submitting');

    const apiUrl = 'https://4qnl1taa5i.execute-api.eu-central-1.amazonaws.com/prod/quote-requests';

    const wrongApiUrl = "https://wrongurl.asdf"
    const requestUrl = apiUrl;

    const requestBody = {
      email: this.contactData.email,
      phone: this.contactData.phone,
      message: this.contactData.message,
      // PRODUCTION
      // recaptchaToken: '=6Ld-P3AsAAAAAPi3pvhc_2EWxmdlrwc320EZqbNq'
      // TESTING
      recaptchaToken: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'
    };

    this.http.post(requestUrl, requestBody).subscribe({
      next: () => {

        this.state.set('success'); 
        console.log("success");
      },
      error: () => {
        this.state.set('error'); 
        console.log("error happened");
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
