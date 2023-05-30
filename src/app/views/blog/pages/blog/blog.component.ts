import {Component, OnInit, AfterViewChecked, ViewEncapsulation, Renderer2} from '@angular/core';
import {ActivatedRoute, Router, ROUTES} from '@angular/router';

import { ScullyRoutesService} from '@scullyio/ng-lib';

import { Subject, Observable } from 'rxjs';
import {takeUntil} from 'rxjs/operators'

import { HighlightService } from '@app/_shared/services';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  preserveWhitespaces: true,
  encapsulation: ViewEncapsulation.Emulated
})
export class BlogComponent implements OnInit, AfterViewChecked {
  private _onDestroy = new Subject()
  links$: Observable<any[]> = this.scully.available$ as any;

  pageData: any;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private scully: ScullyRoutesService,
              private renderer: Renderer2,
              private highlightService: HighlightService) {
  }
  
  ngOnInit() {
    this.scully.getCurrent().subscribe(current => {
      this.pageData = current;
    });

    this.renderer.addClass(document.body, 'scroll-content');
  }

  ngOnDestroy(){
    this._onDestroy.next();
    this._onDestroy.complete();

    this.renderer.removeClass(document.body, 'scroll-content');
  }

  ngAfterViewChecked() {
    this.highlightService.highlightAll();
  }

}
