import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ScullyLibModule} from '@scullyio/ng-lib';

import { AngularMaterialModule } from '@app/_shared/material.module';
import { SharedModule } from '@app/_shared/shared.module';

import { BlogRoutingModule } from './blog.routing';

import { 
  BlogComponent,
  BlogHomeComponent } from './pages';

@NgModule({
  declarations: [
    BlogComponent,
    BlogHomeComponent
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