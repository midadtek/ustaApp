import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ComponentsModule } from '../../../components/components.module';



import { IonicModule } from '@ionic/angular';

import { RestaurantsCompaniesPage } from './restaurants-companies.page';

const routes: Routes = [
  {
    path: '',
    component: RestaurantsCompaniesPage
  }
];

@NgModule({
  imports: [
    CommonModule,ComponentsModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RestaurantsCompaniesPage]
})
export class RestaurantsCompaniesPageModule {}
