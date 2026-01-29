import { Component } from '@angular/core';
import { Gallery, GalleryImage } from '../../gallery/gallery'; // Importáljuk az interfészt is

@Component({
  selector: 'app-home-references',
  standalone: true,
  imports: [Gallery],
  templateUrl: './references.html',
  styleUrl: './references.css',
})
export class References {
  
  generalImages: GalleryImage[] = [
    {
      large: '/assets/img/references/napelem-tisztitas.png',
      thumb: '/assets/img/references/napelem-tisztitas.png',
      width: 1536,
      height: 1024
    },
    {
      large: '/assets/img/references/faltisztitas.png',
      thumb: '/assets/img/references/faltisztitas.png',
      width: 1024,
      height: 1024
    },
    {
      large: '/assets/img/references/terko-tisztitas.png',
      thumb: '/assets/img/references/terko-tisztitas.png',
      width: 1024,
      height: 1024
    },
    {
      large: '/assets/img/references/siremlek-tisztitas.png',
      thumb: '/assets/img/references/siremlek-tisztitas.png',
      width: 1024,
      height: 1024
    }
  ];

  beforeAfterImages: GalleryImage[] = [
  {
    large: '/assets/img/references/napelem-elotte-utana.png',
    thumb: '/assets/img/references/napelem-elotte-utana.png',
    width: 1024,
    height: 1024
  },
  {
    large: '/assets/img/references/fal-elotte-utana.png',
    thumb: '/assets/img/references/fal-elotte-utana.png',
    width: 1024,
    height: 1024
  },
  {
    large: '/assets/img/references/terko-elotte-utana.png',
    thumb: '/assets/img/references/terko-elotte-utana.png',
    width: 1024,
    height: 1024
  },
  {
    large: '/assets/img/references/sirko-elotte-utana.png',
    thumb: '/assets/img/references/sirko-elotte-utana.png',
    width: 1024,
    height: 1024
  }
  ];
}
