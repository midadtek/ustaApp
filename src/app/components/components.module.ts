import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { FilterComponent } from './filter/filter.component';
import { IonicSelectableModule } from 'ionic-selectable';
import { RateComponent } from './Rate/rate.component';
import {IonicRatingModule} from 'ionic4-rating';
import { OrderComponent} from './order/order.component';
import {SearchComponent} from '../views/dashboard/search/search.component'






@NgModule({
  declarations: [
    FilterComponent,
    RateComponent,OrderComponent,SearchComponent
  ],
  imports: [CommonModule, IonicModule,IonicSelectableModule, FormsModule,RouterModule,IonicRatingModule,ReactiveFormsModule],
  exports: [  FilterComponent,SearchComponent,
    RateComponent,OrderComponent],
  entryComponents: [  FilterComponent,
    RateComponent,OrderComponent,SearchComponent]
})
export class ComponentsModule {}
