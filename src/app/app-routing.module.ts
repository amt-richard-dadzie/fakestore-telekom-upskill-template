import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './guards/auth.guard';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes =[
  {
    path: '',
    component: HomeComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./components/product-list/product-list.component').then(
            (module) => module.ProductListComponent
          ),
      },
      {
        path: 'product/:id',
        loadComponent: () =>
          import('./pages/product-detail/product-detail.component').then(
            (module) => module.ProductDetailComponent
          ),
      },
      {
        path: 'checkout',
        loadComponent: () =>
          import('./pages/checkout/checkout.component').then(
            (module) => module.CheckoutComponent
          ),
      },
    ],
  },

  { path: 'login', component: LoginComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
