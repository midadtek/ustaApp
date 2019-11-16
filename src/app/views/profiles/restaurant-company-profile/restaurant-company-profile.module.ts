import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import {ComponentsModule} from '../../../components/components.module';
import { IonicModule } from '@ionic/angular';
import { IonicHeaderParallaxModule } from 'ionic-header-parallax';

import { restaurantcompanyprofilePage } from './restaurant-company-profile.page';
import { IonicRatingModule } from 'ionic4-rating';





const routes: Routes = [
  {
    path: '',
    component: restaurantcompanyprofilePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,IonicHeaderParallaxModule,
    IonicRatingModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [restaurantcompanyprofilePage]
})
export class restaurantcompanyprofilePageModule {}
