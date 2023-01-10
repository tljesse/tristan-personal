import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {
  BlogComponent,
  BlogHomeComponent } from './pages';

const routes: Routes = [
  {
    path: '',
    component: BlogHomeComponent
  },
  {
    path: ':title',
    component: BlogComponent,
    data: {state: 'article'}
  },
  {
    path: '**',
    component: BlogComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogRoutingModule {}

