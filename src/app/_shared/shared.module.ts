import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// import { environment } from '@env/environment';

// import { NoCommaPipe } from './pipes';

// import {  } from './components';

// import { ConfirmActionComponent } from './dialogs';

import { AngularMaterialModule } from './material.module';

const directivesToInclude = [

]

// const pipesToInclude = [

// ]

// const componentsToInclude = [

// ];

@NgModule({
  declarations: [
    // ...componentsToInclude,
    // ...pipesToInclude,
  ],
  imports: [
    CommonModule,
    RouterModule,

    AngularMaterialModule,

    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
  	FormsModule,
  	ReactiveFormsModule,

    // ...pipesToInclude,
    // ...componentsToInclude,
  ],
  providers: [

  ]
})
export class SharedModule { }