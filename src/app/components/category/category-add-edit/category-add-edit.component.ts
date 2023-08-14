import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-category-add-edit',
  templateUrl: './category-add-edit.component.html',
  styleUrls: ['./category-add-edit.component.css']
})
export class CategoryAddEditComponent {
  public isFormSubmitted: boolean = false;
  categoryForm!: FormGroup
  isAddMode: boolean = false;

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private apiService: ApiService){
  }

  ngOnInit() : void {
    this.categoryForm = this.fb.group({
      'name': ['', [Validators.required]],
      'image': [''],
      'description': ['', [Validators.required]],
      'status': [true],
    })

    // this.router.queryParams.subscribe((param)=>{
    //   console.log(param);
      // if(param && param['isView']){
      //   this.isView = param['isView']=='false' ? false : true;
      //   this.title = param['isView']=='false' ? 'Edit Coupon Code' : 'View Coupon Code'
      // }
      //if(param && param['id']){
        // this.selectedCouponId = param['id'];
        // this.getCouponDetails(this.selectedCouponId);
    //     this.isAddMode = false;
    //   }
    // })
  }

  public hasFormError = (controlName: string, errorName: string) => {
    return this.categoryForm.controls[controlName].hasError(errorName);
  }

  getElements(controlName: string) {
    return this.categoryForm.get(controlName);
  }

  addEditCategory(){
    this.isFormSubmitted = true
    if(this.categoryForm && this.categoryForm.valid){
      console.log("form data =====> ", this.categoryForm.value);

    }
  }
}
