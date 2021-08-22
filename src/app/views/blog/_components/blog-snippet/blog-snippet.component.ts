import { Component, Input, OnInit } from '@angular/core';

import { TristanBlogRoute } from '@app/_shared/models/blog'

@Component({
  selector: 'tristan-blog-snippet',
  templateUrl: './blog-snippet.component.html',
  styleUrls: ['./blog-snippet.component.scss']
})
export class BlogSnippetComponent implements OnInit {
  
  @Input() article!: TristanBlogRoute;

  @Input() snippetType: string = '';

   ngOnInit() {
   }
    
}