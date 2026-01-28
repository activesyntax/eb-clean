import { Component } from '@angular/core';
import { Services } from './services/services';
import { Hero } from './hero/hero';
import { References } from './references/references';
import { Advantages} from './advantages/advantages';
import { Contact } from './contact/contact';

@Component({
  selector: 'app-home',
  imports: [Services, Hero, References, Advantages, Contact],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
