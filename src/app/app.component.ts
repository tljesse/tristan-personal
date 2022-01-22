import { Component, Renderer2 } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import {trigger, animate, style, group, animateChild, query, stagger, transition, state} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('routerTransition', [
      transition('* <=> *', [    
        query(':enter, :leave', style({ position: 'fixed', width:'100%' }), {optional: true}),
        group([ 
          query(':enter', [
            style({ transform: 'translateX(200%)' }),
            animate('1s ease-in-out', style({ transform: 'translateX(0%)' }))
          ], {optional: true}),
          query(':leave', [
            style({ transform: 'translateX(0%)' }),
            animate('1s ease-in-out', style({ transform: 'translateX(-200%)' }))], {optional: true}),
        ])
      ])
    ])
   ],
})
export class AppComponent {
  title = 'tristan-personal';

  previousUrl!: string;

  constructor(private renderer: Renderer2,
              private router: Router) {
    this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          if (this.previousUrl) {
            this.renderer.removeClass(document.body, this.previousUrl);
          }
          let currentUrlSlug = event.url.slice(1)
          if (currentUrlSlug) {
            this.renderer.addClass(document.body, currentUrlSlug);
          }
          this.previousUrl = currentUrlSlug;
        }
      });
  }

  getState(outlet: any) {
    // Changing the activatedRouteData.state triggers the animation
    return outlet.activatedRouteData.state;
  }
}
