import { Component } from '@angular/core';
import {Gallery} from '../../gallery/gallery'


@Component({
  selector: 'app-home-references',
  imports: [Gallery],
  templateUrl: './references.html',
  styleUrl: './references.css',
})
export class References {
 folkfiokImages = [
    {
      large: '/assets/img/references/folkfiok-01-01.jpeg',
      thumb: '/assets/img/references/thumbs/folkfiok-01-01.jpeg',
      width: 1064,
      height: 841
    },
    {
      large: '/assets/img/references/folkfiok-01-02.jpeg',
      thumb: '/assets/img/references/thumbs/folkfiok-01-02.jpeg',
      width: 1064,
      height: 1068
    },
    {
      large: '/assets/img/references/folkfiok-02.jpeg',
      thumb: '/assets/img/references/thumbs/folkfiok-02.jpeg',
      width: 800,
      height: 738
    },
    {
      large: '/assets/img/references/folkfiok-03.jpeg',
      thumb: '/assets/img/references/thumbs/folkfiok-03.jpeg',
      width: 800,
      height: 668
    }  ];
}
