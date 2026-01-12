import { Component } from '@angular/core';
import { Branding } from '../../shared/branding/branding';

@Component({
  selector: 'app-home-hero',
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {

  branding = Branding
}
