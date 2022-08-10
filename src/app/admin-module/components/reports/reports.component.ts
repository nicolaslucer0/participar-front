import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { CategoryService } from 'src/app/services/categories.service';


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  categories: Category[];

  constructor(private spinner: NgxSpinnerService, public categoryService: CategoryService) {}

  categoriesColor = ['#d50000', '#AACCFF', '#FFFF00', '#8bc34a', '#ff6d00', '#00AAFF'];
  ngOnInit() {
    this.categoryService.getAll().subscribe((categories: Category[]) => {
      this.categories = categories;
    });
  }
}
