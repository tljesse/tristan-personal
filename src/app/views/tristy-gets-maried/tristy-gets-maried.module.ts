import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularMaterialModule } from '@app/_shared/material.module';
import { SharedModule } from '@app/_shared/shared.module';

import { TristyGetsMariedRoutingModule } from './tristy-gets-maried.routing';

import { HomeComponent } from './pages/home/home.component';
import { CovidComponent } from './pages/covid/covid.component';



@NgModule({
  declarations: [
    HomeComponent,
    CovidComponent
  ],
  imports: [
    CommonModule,

    AngularMaterialModule,
    SharedModule,

    TristyGetsMariedRoutingModule
  ]
})
export class TristyGetsMariedModule { }
