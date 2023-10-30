import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { ConfirmService } from 'src/app/services/confirmation/confirm.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent {
  categotyList : Array<any> = []

  constructor(
    private apiService: ApiService,
    private confirmService: ConfirmService,
    private toastService: ToastService) {
    
  }
  
  async ngOnInit(): Promise<void> {
    await this.getCategoryList();
  }

  getCategoryList(){
    this.apiService.getRequest(`${environment.CATEGORY}/list`, {}, (response : any)=> {
      console.log("response ===> ", response);
      if (response.data) {
        this.categotyList = response.data;
      }
    })
  }

  editCategory(id:string) {
    
  }

  deleteCategory(id:string) {
    console.log("Delete category clicked : ", id);
    
    let data = {
      message: 'Are you sure you want to delete this Category?',
      header: 'Category Delete',
      icon: 'pi pi-times-circle text-danger',
      acceptLabel: 'Ok',
      rejectLabel: 'Cancel',
      rejectButtonStyleClass: 'ui-button-secondary',
    }
    this.confirmService.confirmDelete(data, ()=> {
      this.apiService.deleteRequest(`${environment.CATEGORY}/${id}`, {}, (response:any)=>{
        if (response.status == 200 && !response.hasOwnProperty('error')) {
          this.toastService.showSuccess("Category Deleted successfully");
          this.getCategoryList();
        } else if (response.hasOwnProperty('error')) {
          this.toastService.showError(response.error.message);
        }
      })
    })
  }
}
