import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ComponentsModule } from '../../../components/components.module';

import { IonicModule } from '@ionic/angular';

import { UsedShopsPage } from './used-shops.page';

const routes: Routes = [
  {
    path: '',
    component: UsedShopsPage
  }
];

@NgModule({
  imports: [
    CommonModule,ComponentsModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UsedShopsPage]
})
export class UsedShopsPageModule {}
