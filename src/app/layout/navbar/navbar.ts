import { Component, AfterViewInit, signal } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements AfterViewInit {

  activeSection = signal<string | null>(null);
  sections = ['hero', 'services', 'references', 'experience', 'contact'];

  constructor(private router: Router) {}

  ngAfterViewInit() {
    // Wait for home component to be loaded into the DOM
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => this.initObserver());
  }

  initObserver() {
    const options = {
      root: null,
      rootMargin: '0% 0px -80% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.activeSection.set(entry.target.id);
        }
      });
    }, options);

    // Try again after routing
    this.sections.forEach(id => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
  }
}
