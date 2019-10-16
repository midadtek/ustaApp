import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {path:'dashboard',loadChildren: './views/dashboard/dashboard.module#DashboardPageModule'},
  {path:'newusta',loadChildren: './views/dashboard/new-usta/new-usta.module#NewUstaPageModule'},
  {path:'newcompany',loadChildren: './views/dashboard/new-company/new-company.module#NewCompanyageModule'},
  {path:'newrestaurant',loadChildren: './views/dashboard/new-restaurant/new-restaurant.module#NewRestaurantPageModule'},
  {path:'ustas/:id',loadChildren: './views/lists/ustas/ustas.module#UstasPageModule'},
  {path:'companies',loadChildren: './views/lists/companies/companies.module#CompaniesPageModule'},
  {path:'restaurants',loadChildren: './views/lists/restaurants/restaurants.module#RestaurantsPageModule'},

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
