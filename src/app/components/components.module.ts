import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { FilterComponent } from './filter/filter.component';
import { IonicSelectableModule } from 'ionic-selectable';

const routes: Routes = [
  {
    path: '',
    component: FilterComponent
  }
];

@NgModule({
  declarations: [
    FilterComponent
  ],
  imports: [CommonModule, IonicModule,IonicSelectableModule,FormsModule,RouterModule],
  exports: [  FilterComponent],
  entryComponents: [  FilterComponent]
})
export class ComponentsModule {}
