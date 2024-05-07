import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryAddEditComponent } from './category-add-edit/category-add-edit.component';
import { CategoryComponent } from './category.component';

const routes: Routes = [
  {
    path:'',
    component: CategoryComponent,
    children: [
      {
        path: '',
        component: CategoryListComponent,
      },
      {
        path: 'add',
        component: CategoryAddEditComponent
      },
      {
        path: 'edit/:id',
        component: CategoryAddEditComponent
      },
      {
        path: 'view/:id',
        component: CategoryAddEditComponent
      }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
