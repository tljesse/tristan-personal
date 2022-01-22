import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'tristan-blog-header',
  templateUrl: './blog-header.component.html',
  styleUrls: ['./blog-header.component.scss']
})
export class BlogHeaderComponent implements OnInit {

  @Input() title: string = '';
  @Input() subtitle!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
