/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/components/alert/alert.service';
import { ModelService } from 'src/app/components/model/model.service';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent {
  categotyList = []

  constructor(
    private categoryServices: CategoryService,
    private modelService: ModelService,
    private alertService: AlertService,
    private router: Router
  ) {

  }

  async ngOnInit(): Promise<void> {
    await this.getCategoryList();
  }

  getCategoryList() {
    this.categoryServices.getCategory({}, (response) => {
      if (response.status === 200 && response.data) {
        this.categotyList = response.data;
      } else {
        console.log('Error while fetching category =====', response);
      }
    })
  }

  public openConfirmationDialog(id) {
    this.modelService.confirm('Please confirm...', 'Are you Sure you want to delete this category?')
      .then((confirmed) => { 
        if (confirmed) {
          this.categoryServices.deleteCategory(id, response => {
            this.alertService.success(`Category deleted successfully : ${response.data.id}`, { autoClose: true, keepAfterRouteChange: true })
            this.getCategoryList()
          })
        }
      })
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }
}
