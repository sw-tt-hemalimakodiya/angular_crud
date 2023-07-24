import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StockComponent } from './components/stock/stock.component';
import { MutualFundsComponent } from './components/mutual-funds/mutual-funds.component';
import { authGuard, notAuthGuard } from './auth/auth.guard';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: '', component: LoginComponent,canActivate:[notAuthGuard]},
  { path: 'login', component: LoginComponent, canActivate:[notAuthGuard]},
  { path: 'register', component: RegisterComponent, canActivate:[notAuthGuard]},
  { path: 'dashboard', component: DashboardComponent,canActivate:[authGuard]},
  { path: 'stocks', component: StockComponent, canActivate:[authGuard]},
  { path: 'mutual-funds', component: MutualFundsComponent, canActivate:[authGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
