import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { FilterComponent } from './filter/filter.component';
import { IonicSelectableModule } from 'ionic-selectable';
import { RateComponent } from './Rate/rate.component';
import{IonicRatingModule} from 'ionic4-rating'





@NgModule({
  declarations: [
    FilterComponent,
    RateComponent
  ],
  imports: [CommonModule, IonicModule,IonicSelectableModule,FormsModule,RouterModule,IonicRatingModule,ReactiveFormsModule],
  exports: [  FilterComponent,
    RateComponent],
  entryComponents: [  FilterComponent,
    RateComponent]
})
export class ComponentsModule {}
