import {
  AfterViewInit,
  Component,
  NgZone,
  input,
  computed,
  ViewChild,
  ElementRef
} from '@angular/core';
import PhotoSwipeLightbox from 'photoswipe/lightbox';

export interface GalleryImage {
  large: string;
  thumb: string;
  width: number;
  height: number;
}

@Component({
  selector: 'app-gallery',
  standalone: true,
  templateUrl: './gallery.html'
})
export class Gallery implements AfterViewInit {

  images = input.required<GalleryImage[]>();
  mode = input<'thumbnails' | 'open-only'>('thumbnails');
  thumbnailsVisible = computed(() => this.mode() === 'thumbnails');

  @ViewChild('galleryEl', { static: false })
  private galleryEl!: ElementRef<HTMLElement>;

  private lightbox?: PhotoSwipeLightbox;

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.lightbox = new PhotoSwipeLightbox({
        gallery: this.galleryEl.nativeElement,
        children: 'a',
        initialZoomLevel: 'fit',
        maxZoomLevel: 1,
        pswpModule: () => import('photoswipe')
      });

      this.lightbox.init();
    });
  }

  /** Public API: open gallery programmatically */
  open(index = 0): void {
    this.lightbox?.loadAndOpen(index);
  }
}
