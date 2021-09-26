import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ScullyLibModule} from '@scullyio/ng-lib';

import { AngularMaterialModule } from '@app/_shared/material.module';
import { SharedModule } from '@app/_shared/shared.module';

import { BlogRoutingModule } from './blog-routing.module';

import { BlogSnippetComponent} from './_components';

import { 
  BlogComponent,
  BlogHomeComponent } from './pages';
import { BlogHeaderComponent } from './_components/blog-header/blog-header.component';

@NgModule({
  declarations: [
    BlogSnippetComponent,

    BlogComponent,
    BlogHomeComponent,
    BlogHeaderComponent
  ],
  imports: [
    CommonModule,

    SharedModule,
    AngularMaterialModule, 
    BlogRoutingModule,
    ScullyLibModule
  ],
  providers: [
  ]
  
})
export class BlogModule {}