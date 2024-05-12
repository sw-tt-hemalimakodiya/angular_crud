import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { authGuard } from 'src/app/guard/auth.guard';

const routes: Routes = [
  {
    path:'',
    component: AdminComponent,
    canActivate:[authGuard],
    children: [
      { 
        path:'category',
        loadChildren:() => import('./category/category.module').then(m => m.CategoryModule)
      },
      {
        path:'product',
        loadChildren:() => import('./product/product.module').then(m => m.ProductModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
