import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { environment } from 'src/environments/environment';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-category-add-edit',
  templateUrl: './category-add-edit.component.html',
  styleUrls: ['./category-add-edit.component.css']
})
export class CategoryAddEditComponent {
  public isFormSubmitted: boolean = false;
  categoryForm!: FormGroup
  isEditMode: boolean = false;
  categoryId : any = ""

  constructor(private fb: FormBuilder,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private toastService: ToastService,
    private apiService: ApiService){
  }

  async ngOnInit() : Promise<void> {
    this.categoryForm = this.fb.group({
      'name': ['', [Validators.required]],
      'image': [''],
      'description': ['', [Validators.required]],
      'status': [true],
    })

    this.categoryId = this.activeRoute.snapshot.paramMap.get('id');
    if (this.categoryId) {
      this.isEditMode = true;
      this.getCategoryDetails(this.categoryId);
    }
  }

  public hasFormError = (controlName: string, errorName: string) => {
    return this.categoryForm.controls[controlName].hasError(errorName);
  }

  getCategoryDetails(id : string) {
    this.apiService.getRequest(`${environment.CATEGORY}/categoryById/${id}`, {}, (response: any) => {
      if (response.data) {
        this.categoryForm.patchValue(response.data)
      }
    })
  }

  getElements(controlName: string) {
    return this.categoryForm.get(controlName);
  }

  addEditCategory() {
    this.isFormSubmitted = true
    if(this.categoryForm && this.categoryForm.valid){
      console.log("form data =====> ", this.categoryForm.value);

      if (this.isEditMode) {
        this.apiService.putRequest(`${environment.CATEGORY}/${this.categoryId}`, this.categoryForm.value, {}, (response : any) => {
          if (response.status == 200 && !response.hasOwnProperty('error')) {
            this.toastService.showSuccess("Category Updated successfully");
            this.router.navigate(['/category']);
          } else if (response.hasOwnProperty('error')) {
            this.toastService.showError(response.error.message);
          }
        })
      } else {
        this.apiService.postRequest(environment.CATEGORY, this.categoryForm.value, (response:any)=>{
          if (response.status == 200 && !response.hasOwnProperty('error')) {
            this.toastService.showSuccess("Category added successfully");
            this.router.navigate(['/category']);
          } else if (response.hasOwnProperty('error')) {
            this.toastService.showError(response.error.message);
          }
        })
      }
    }
  }
}
