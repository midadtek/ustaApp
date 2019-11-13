import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {path: 'dashboard/:sectionid', loadChildren: './views/dashboard/dashboard.module#DashboardPageModule'},
  {path: 'newusta', loadChildren: './views/dashboard/new-usta/new-usta.module#NewUstaPageModule'},
  {path: 'newcompany', loadChildren: './views/dashboard/new-company/new-company.module#NewCompanyPageModule'},
  {path: 'newused', loadChildren: './views/dashboard/new-used/new-used.module#NewUsedPageModule'},
  {path: 'ustas/:id', loadChildren: './views/lists/ustas/ustas.module#UstasPageModule'},
  {path: 'companies', loadChildren: './views/lists/companies/companies.module#CompaniesPageModule'},
  {path: 'restaurants', loadChildren: './views/lists/restaurants/restaurants.module#RestaurantsPageModule'},
  { path: 'used-shops/:id', loadChildren: './views/lists/used-shops/used-shops.module#UsedShopsPageModule' },
  { path: 'contact-us', loadChildren: './views/dashboard/contact-us/contact-us.module#ContactUsPageModule' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
