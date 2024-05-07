import { Component } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import tableData from 'src/fake-data/default-data.json';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export default class CategoryComponent {
  tables = tableData;
}
