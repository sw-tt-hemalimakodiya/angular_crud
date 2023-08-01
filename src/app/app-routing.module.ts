import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard, notAuthGuard } from './auth/auth.guard';
import { RegisterComponent } from './components/register/register.component';
import { CategoryComponent } from './components/category/category.component'
import { ProductComponent } from './components/product/product.component'

const routes: Routes = [
  { path: '', component: LoginComponent,canActivate:[notAuthGuard]},
  { path: 'login', component: LoginComponent, canActivate:[notAuthGuard]},
  { path: 'register', component: RegisterComponent, canActivate:[notAuthGuard]},
  { path: 'dashboard', component: DashboardComponent,canActivate:[authGuard]},
  { path: 'category', component: CategoryComponent, canActivate:[authGuard]},
  { path: 'product', component: ProductComponent, canActivate:[authGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
