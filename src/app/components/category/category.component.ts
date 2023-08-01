import { Component } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  showCategoryForm : boolean = true

  constructor() {
    
  }
  
  ngOnInit(): void {

  }

  addCategory() {
    console.log("Add category clicked");
    this.showCategoryForm = true;
  }
}
