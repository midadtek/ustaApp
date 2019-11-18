import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicSelectableModule } from 'ionic-selectable';



import { IonicModule } from '@ionic/angular';

import { NewUstaPage } from './new-usta.page';

const routes: Routes = [
  {
    path: '',
    component: NewUstaPage
  }
];

@NgModule({
  imports: [
    CommonModule,IonicSelectableModule,ReactiveFormsModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NewUstaPage]
})
export class NewUstaPageModule {}
