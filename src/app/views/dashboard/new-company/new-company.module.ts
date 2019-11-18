import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { IonicSelectableModule } from 'ionic-selectable';

import { NewCompanyPage } from './new-company.page';

const routes: Routes = [
  {
    path: '',
    component: NewCompanyPage
  }
];

@NgModule({
  imports: [
    CommonModule,ReactiveFormsModule,IonicSelectableModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NewCompanyPage]
})
export class NewCompanyPageModule {}
