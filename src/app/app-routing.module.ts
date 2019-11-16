import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {path: 'dashboard', loadChildren: './views/dashboard/dashboard.module#DashboardPageModule'},
  {path: 'newusta', loadChildren: './views/dashboard/new-usta/new-usta.module#NewUstaPageModule'},
  {path: 'newcompany', loadChildren: './views/dashboard/new-company/new-company.module#NewCompanyPageModule'},
  {path: 'newused', loadChildren: './views/dashboard/new-used/new-used.module#NewUsedPageModule'},
  {path: 'ustas/:sectionid', loadChildren: './views/lists/ustas/ustas.module#UstasPageModule'},
  {path: 'companies', loadChildren: './views/lists/companies/companies.module#CompaniesPageModule'},
  {path: 'restaurants-companies/:sectionid',
   loadChildren: './views/lists/restaurants-companies/restaurants-companies.module#RestaurantsCompaniesPageModule'},
  { path: 'used-shops/:sectionid', loadChildren: './views/lists/used-shops/used-shops.module#UsedShopsPageModule' },
  { path: 'contact-us', loadChildren: './views/dashboard/contact-us/contact-us.module#ContactUsPageModule' },
  { path: 'profile-banner', loadChildren: './views/profiles/profile-banner/profile-banner.module#ProfileBannerPageModule'},
  { path: 'profile', loadChildren: './views/profiles/profile/profile.module#ProfilePageModule' },

  { path: 'ustaprofile/:id', loadChildren: './views/profiles/ustaprofile/ustaprofile.module#UstaprofilePageModule'},

  { path: 'restaurant-company-profile/:id',
   loadChildren: './views/profiles/restaurant-company-profile/restaurant-company-profile.module#restaurantcompanyprofilePageModule'},

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
