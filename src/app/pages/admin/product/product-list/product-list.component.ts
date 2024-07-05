import { Component } from '@angular/core';
import { AlertService } from 'src/app/components/alert/alert.service';
import { ModelService } from 'src/app/components/model/model.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  productList = []

  constructor(
    private productServices: ProductService,
    private modelService: ModelService,
    private alertService: AlertService
  ) {

  }

  async ngOnInit(): Promise<void> {
    await this.getProductList();
  }

  getProductList() {
    this.productServices.getProduct({}, (response) => {
      if (response.status === 200 && response.data) {
        this.productList = response.data;
      } else {
        console.log('Error while fetching category =====', response);
      }
    })
  }

  public openConfirmationDialog(id) {
    this.modelService.confirm('Please confirm...', 'Are you Sure you want to delete this product?')
      .then((confirmed) => { 
        if (confirmed) {
          this.productServices.deleteProduct(id, response => {
            this.alertService.success(`Category deleted successfully : ${response.data.id}`, { autoClose: true, keepAfterRouteChange: true })
            this.getProductList()
          })
        }
      })
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }
}
