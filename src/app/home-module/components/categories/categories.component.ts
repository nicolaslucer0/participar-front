import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/categories.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: Category[];

  constructor(private spinner: NgxSpinnerService, public categoryService: CategoryService) {}

  categoriesColor = ['#d50000', '#AACCFF', '#FFFF00', '#8bc34a', '#ff6d00', '#00AAFF'];
  ngOnInit() {
    this.spinner.show()
    this.categoryService.getAll().subscribe((categories: Category[]) => {
      this.categories = categories;
      this.spinner.hide()
    });
  }
}
