import { Component, inject, signal, OnInit,  ChangeDetectorRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { of, delay } from 'rxjs';
import { HttpClient } from '@angular/common/http'; 

@Component({
  selector: 'app-quote-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './quote-form.html',
  styleUrl: './quote-form.css',
})
export class QuoteForm implements OnInit {

  user = signal('eros.balazs');
  domain = signal('eb-clean.hu');

  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  private cdr = inject(ChangeDetectorRef);

  contactForm: FormGroup;
  confirmationModal: any;
  state: 'idle' | 'submitting'| 'missing-contact' | 'success' | 'error' = 'idle' ;
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
    this.state = 'idle';

    const formValue = this.contactForm.value;
    const extractedContacts = this.extractContactInfo(formValue.message);

    const email = extractedContacts.email;
    const phone = extractedContacts.phone;

    console.log('email: ' + email);
    
    if (!email && !phone) {
      this.state = 'missing-contact'
      return;
    }

    this.contactData = {
      email: email,
      phone: phone,
      message: formValue.message
    };

    this.sendRequest();

    // this.submissionStatus = 'error';

    // delay(3000);
    
    // this.submissionStatus = 'error'
  }

  sendRequest() {
    if (!this.contactData) {
      return;
    }

    this.state = 'submitting'

    const apiUrl = 'https://4qnl1taa5i.execute-api.eu-central-1.amazonaws.com/prod/quote-requests';

    const wrongApiUrl = "https://wrongurl.asdf"
    const requestUrl = apiUrl;

    const requestBody = {
      email: this.contactData.email,
      phone: this.contactData.phone,
      message: this.contactData.message
    };

    this.http.post(requestUrl, requestBody).subscribe({
      next: () => {
        this.state = 'success';
        this.cdr.detectChanges();
        console.log("success");
      },
      error: () => {
        this.state = 'error';
        this.cdr.detectChanges();
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
