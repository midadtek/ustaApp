import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { housescarstuffprofilePage } from './house-car-stuff-profile.page';
import { IonicRatingModule } from "ionic4-rating";
import {ComponentsModule} from '../../../components/components.module';





const routes: Routes = [
  {
    path: '',
    component: housescarstuffprofilePage
  }
];

@NgModule({
  imports: [
    CommonModule,ComponentsModule,
    FormsModule,
    IonicModule,
    IonicRatingModule,
    RouterModule.forChild(routes)
  ],
  declarations: [housescarstuffprofilePage]
})
export class housescarstuffprofilePageModule {}
