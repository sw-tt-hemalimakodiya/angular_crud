// angular import
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Project import
import LoginComponent from './pages/login/login.component';
import RegisterComponent from './pages/register/register.component';
import { authGuard, notAuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [notAuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [notAuthGuard]
  },
  {
    path: 'admin',
    loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule),
    canActivate: [authGuard],
    data: {
      breadcrumb: 'Dashboard',
    },
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
