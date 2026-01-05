import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-home-contact',
  imports: [],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  user = signal('contact');
  domain = signal('activesyntax.net');
}
