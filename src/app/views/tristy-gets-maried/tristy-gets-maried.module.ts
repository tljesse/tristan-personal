import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularMaterialModule } from '@app/_shared/material.module';
import { SharedModule } from '@app/_shared/shared.module';

import { TristyGetsMariedRoutingModule } from './tristy-gets-maried.routing';

import { 
  CovidComponent,
  HomeComponent } from './pages';

import {
  CovidService,
  StorageService } from './services';

//import { NgxFileDropModule } from 'ngx-file-drop';

@NgModule({
  declarations: [
    CovidComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,

    AngularMaterialModule,
    SharedModule,

    TristyGetsMariedRoutingModule,

    //NgxFileDropModule
  ],
  providers: [
    CovidService,
    StorageService
  ]
})
export class TristyGetsMariedModule { }
