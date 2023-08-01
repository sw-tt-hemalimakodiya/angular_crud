import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category-add-edit',
  templateUrl: './category-add-edit.component.html',
  styleUrls: ['./category-add-edit.component.css']
})
export class CategoryAddEditComponent {
  public isFormSubmitted: boolean = false;
  categoryForm!: FormGroup

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router){
  }

  ngOnInit() : void {
    this.categoryForm = this.fb.group({
      'name': ['', [Validators.required]],
      'image': [''],
      'description': ['', [Validators.required]],
      'status': [true],
    })
  }

  public hasFormError = (controlName: string, errorName: string) => {
    return this.categoryForm.controls[controlName].hasError(errorName);
  }

  getElements(controlName: string) {
    return this.categoryForm.get(controlName);
  }

  addEditCategory(){
    this.isFormSubmitted = true
    console.log("form data =====> ", this.categoryForm.value);
    
  }
}
