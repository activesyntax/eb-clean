import { Component, } from '@angular/core';
import { QuoteForm } from '../../quote-form/quote-form';

@Component({
  selector: 'app-home-contact',
  standalone: true,
  imports: [QuoteForm],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
}
