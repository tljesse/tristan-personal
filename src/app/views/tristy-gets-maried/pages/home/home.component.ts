import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  links: {text: string, href?: string, routerLink?: string}[] = [
    {text: 'Itinerary', href: 'https://www.zola.com/wedding/tristygetsmaried/event'},
    {text: 'RSVP', href: 'https://www.zola.com/wedding/tristygetsmaried/rsvp'},
    {text: 'FAQ', href: 'https://www.zola.com/wedding/tristygetsmaried/faq'},
    {text: 'COVID', routerLink: '/tristygetsmaried/covid' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}