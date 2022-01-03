import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { 
  CovidComponent,
  HomeComponent } from './pages';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'covid',
    component: CovidComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TristyGetsMariedRoutingModule { }
