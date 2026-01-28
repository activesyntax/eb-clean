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
  
  // 1. Általános munkálatok galéria (a generált képek)
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

  // 2. Előtte-Utána galéria (a meglévő folkfiok referenciák)
  beforeAfterImages: GalleryImage[] = [
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
    }
  ];
}
