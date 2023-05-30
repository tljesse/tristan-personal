import { Component, OnInit } from '@angular/core';

import { TristanBlogRoute } from '@app/_shared/models/blog';
import { ScullyRoutesService} from '@scullyio/ng-lib';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-blog-home',
  templateUrl: './blog-home.component.html',
  styleUrls: ['./blog-home.component.scss']
})
export class BlogHomeComponent implements OnInit {
  links$: Observable<TristanBlogRoute[]> = this.scully.available$ as any;

  articles: TristanBlogRoute[] = [];

  constructor(private scully: ScullyRoutesService) { }


  ngOnInit(): void {
    this.links$.subscribe((links) => {
      let articles = links?.reduce((all: TristanBlogRoute[], route: TristanBlogRoute) => route?.published ? [...all, route] : all, []);
      //articles.sort((a: any, b: any) => -a.datePublished.localeCompare(b.datePublished));
      console.log(articles);

      this.articles = articles
    });
  }

}
