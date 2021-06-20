import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularMaterialModule } from '@app/_shared/material.module';
import { SharedModule } from '@app/_shared/shared.module';

import { LandingRoutingModule } from './landing.routing';

import { HomeComponent } from './pages';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,

    AngularMaterialModule,
    SharedModule,

    LandingRoutingModule
  ]
})
export class LandingModule { }
