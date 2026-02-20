import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { of, delay } from 'rxjs';
import { HttpClient } from '@angular/common/http'; 
import { timeout } from 'rxjs/operators'; 

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
  state = signal<'idle' | 'submitting' | 'message-too-short'| 'missing-contact'|'invalid-contact' | 'success' | 'error'>('idle');
 
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
    const messageControl = this.contactForm.get('message');

    this.http.get<{ quoteTemplateMessage: string }>('assets/data/messages.json').subscribe(data => {

      const message = data.quoteTemplateMessage;
      messageControl?.setValue(message);
      messageControl?.valueChanges
              .subscribe(status => {
                  this.messageLenghtValidation()
                } );
    });
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

  messageLenghtValidation()
  {
    const messageControl = this.contactForm.get('message');
    if (messageControl?.hasError('minlength')) {
         this.state.set('message-too-short');
    }
    else {
        this.state.set('idle');
    }
  }

  sendRequest() {
    if (!this.contactData) {
      return;
    }

    this.state.set('submitting');

    const apiUrl = 'https://4qnl1taa5i.execute-api.eu-central-1.amazonaws.com/prod/quote-requests';

    const wrongApiUrl = "https://wrongurl.asdf"
    const requestUrl = apiUrl;

    const siteKey =  '6Ld-P3AsAAAAAPi3pvhc_2EWxmdlrwc320EZqbNq';

    grecaptcha.ready(() => {
      grecaptcha.execute(siteKey, { action: 'submit_contact' }).then((token: string) => {

        const requestBody = {
          email: this.contactData?.email,
          phone: this.contactData?.phone,
          message: this.contactData?.message,
          recaptchaToken: token
        };

        this.http.post(requestUrl, requestBody).subscribe({
          next: (response) => {

            this.state.set('success'); 
            console.log("Server Success Response:", response);
            },
          error: (response) => {
            this.state.set('error'); 
            console.log("Server Error Response:", response);        
          }
      });
    });
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
