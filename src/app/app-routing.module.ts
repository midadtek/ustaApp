import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {path: 'dashboard', loadChildren: './views/dashboard/dashboard.module#DashboardPageModule'},

  {path: 'new-usta', loadChildren: './views/dashboard/new-usta/new-usta.module#NewUstaPageModule'},
  {path: 'new-company', loadChildren: './views/dashboard/new-company/new-company.module#NewCompanyPageModule'},
  { path: 'new-used-shop', loadChildren: './views/dashboard/new-used-shop/new-used-shop.module#NewUsedShopPageModule'},
  {path: 'contact-us', loadChildren: './views/dashboard/contact-us/contact-us.module#ContactUsPageModule'},

  {path: 'companies', loadChildren: './views/lists/companies/companies.module#CompaniesPageModule'},
  {path: 'restaurants-companies/:sectionid',
   loadChildren: './views/lists/restaurants-companies/restaurants-companies.module#RestaurantsCompaniesPageModule'},
  { path: 'used-shops/:sectionid', loadChildren: './views/lists/used-shops/used-shops.module#UsedShopsPageModule' },
  { path: 'profile-banner', loadChildren: './views/profiles/profile-banner/profile-banner.module#ProfileBannerPageModule'},
  { path: 'profile', loadChildren: './views/profiles/profile/profile.module#ProfilePageModule' },
  { path: 'favorites', loadChildren: './views/dashboard/favorites/favorites.module#FavoritesPageModule' },
  { path: 'asked-question', loadChildren: './views/dashboard/asked-question/asked-question.module#AskedQuestionPageModule' },
  { path: 'about-us', loadChildren: './views/dashboard/about-us/about-us.module#AboutUsPageModule' },
  {path: 'ustas/:sectionid', loadChildren: './views/lists/ustas/ustas.module#UstasPageModule'},

  { path: 'ustaprofile/:id', loadChildren: './views/profiles/ustaprofile/ustaprofile.module#UstaprofilePageModule'},

  { path: 'restaurant-company-profile/:id',
   loadChildren: './views/profiles/restaurant-company-profile/restaurant-company-profile.module#restaurantcompanyprofilePageModule'},
   { path: 'house-car-stuff-profile/:id',
   loadChildren: './views/profiles/house-car-stuff-profile/house-car-stuff-profile.module#housescarstuffprofilePageModule'},

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
