import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/components/alert/alert.service';
import { CategoryService } from 'src/app/services/category/category.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-product-add-edit',
  templateUrl: './product-add-edit.component.html',
  styleUrl: './product-add-edit.component.scss'
})
export class ProductAddEditComponent {
  productFrom: FormGroup
  submitted = false
  id: string
  isAddMode: boolean = true
  isViewMode: boolean = false
  categoryList = []

  constructor(private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router,
    private alertService: AlertService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.getCategoryList()
    this.productFrom = this.fb.group({
      id: ['', []],
      name: ['', [Validators.required]],
      categoryId: ['', [Validators.required]],
      price: ['', [Validators.required]],
      // imagePath: ['', [Validators.required]],
      status: ['', []],
    });

    // For edit and view operation take Id
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    if (!this.isAddMode) {
      this.productService.getProductById(this.id, response => {
        this.productFrom.controls['id'].setValue(response.data.id)
        this.productFrom.controls['name'].setValue(response.data.name)
        this.productFrom.controls['categoryId'].setValue(response.data.categoryId)
        this.productFrom.controls['price'].setValue(response.data.price)
        this.productFrom.controls['status'].setValue(response.data.status)
      })
    }
    if (this.route.snapshot.routeConfig.path === 'view/:id') {
      this.isViewMode = true
      this.productFrom.controls['name'].disable();
      this.productFrom.controls['categoryId'].disable();
      this.productFrom.controls['price'].disable();
      this.productFrom.controls['status'].disable();
    }
  }

  getElement(element) {
    return this.productFrom.get(element);
  }

  getCategoryList() {
    this.categoryService.getCategory({}, (response) => {
      if (response.status === 200 && response.data) {
        this.categoryList = response.data;
      } else {
        console.log('Error while fetching category =====', response);
      }
    })
  }

  onSubmit() {
    this.submitted = true;
    if (this.productFrom.invalid) {
      return;
    } else {
      if (this.isAddMode) {
        this.addProduct()
      } else {
        this.editProduct(this.id)
      }
    }
  }

  addProduct() {
    this.productService.addProduct(this.productFrom.value, (response) => {
      if (response.status === 200 && response.data) {
        this.alertService.success(`Product added successfully : ${response.data.id}`, { autoClose: true, keepAfterRouteChange: true })
        this.router.navigate(['admin/product']);
      }
    })
  }

  editProduct(id) {
    this.productService.editProduct(id, this.productFrom.value, response => {
      if (response.status === 200 && response.data) {
        this.alertService.success(`Product updated successfully : ${response.data.id}`, { autoClose: true, keepAfterRouteChange: true })
        this.router.navigate(['admin/product']);
      }
    })
  }
}
