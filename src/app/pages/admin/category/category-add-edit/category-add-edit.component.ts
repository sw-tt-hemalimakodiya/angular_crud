import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/components/alert/alert.service';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-category-add-edit',
  templateUrl: './category-add-edit.component.html',
  styleUrl: './category-add-edit.component.scss'
})
export class CategoryAddEditComponent implements OnInit {
  categoryFrom: FormGroup
  submitted = false
  id: string;
  isAddMode: boolean = true;
  isViewMode: boolean = false

  constructor(private fb: FormBuilder,
    private categoryServices: CategoryService,
    private router: Router,
    private alertService: AlertService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.categoryFrom = this.fb.group({
      name: ['', [Validators.required]],
      status: [''],
    });

    // For edit and view operation take Id
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    if (!this.isAddMode) {
      this.categoryServices.getCategoryById(this.id, response => {
        this.categoryFrom.controls['name'].setValue(response.data.name)
        this.categoryFrom.controls['status'].setValue(response.data.status)
      })
    }
    if (this.route.snapshot.routeConfig.path === 'view/:id') {
      this.isViewMode = true
      this.categoryFrom.controls['name'].disable();
      this.categoryFrom.controls['status'].disable();
    }
  }

  get name() {
    return this.categoryFrom.get('name');
  }

  onSubmit() {
    this.submitted = true;
    if (this.categoryFrom.invalid) {
      return;
    } else {
      if (this.isAddMode) {
        this.addCategory()
      } else {
        this.editCategory(this.id)
      }
    }
  }

  editCategory(id) {
    this.categoryServices.editCategory(id, this.categoryFrom.value, response => {
      if (response.status === 200 && response.data) {
        this.alertService.success(`Category updated successfully : ${response.data.id}`, { autoClose: true, keepAfterRouteChange: true })
        this.router.navigate(['admin/category']);
      }
    })
  }

  addCategory() {
    this.categoryServices.addCategory(this.categoryFrom.value, (response) => {
      if (response.status === 200 && response.data) {
        this.alertService.success(`Category added successfully : ${response.data.id}`, { autoClose: true, keepAfterRouteChange: true })
        this.router.navigate(['admin/category']);
      }
    })
  }
}
