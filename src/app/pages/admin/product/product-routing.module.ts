import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductAddEditComponent } from './product-add-edit/product-add-edit.component';

const routes: Routes = [
  {
    path:'',
    component: ProductComponent,
    children: [
      {
        path: '',
        component: ProductListComponent
      },
      {
        path: 'add',
        component: ProductAddEditComponent,
        data: {
          breadcrumb: 'Add',
        }
      },
      {
        path: 'edit/:id',
        component: ProductAddEditComponent,
        data: {
          breadcrumb: 'Edit',
        }
      },
      {
        path: 'view/:id',
        component: ProductAddEditComponent,
        data: {
          breadcrumb: 'View',
        }
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
