import { Component, OnInit, ViewChild } from '@angular/core';
import { Proyecto } from 'src/app/models/laws.model';
import { LawService } from 'src/app/services/law.service';
import {
  SwiperConfigInterface,
  SwiperComponent,
  SwiperScrollbarInterface,
  SwiperPaginationInterface
} from 'ngx-swiper-wrapper';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/categories.service';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-laws',
  templateUrl: './laws.component.html',
  styleUrls: ['./laws.component.css']
})
export class LawsComponent implements OnInit {
  @ViewChild(SwiperComponent, { static: true }) componentRef?: SwiperComponent;

  constructor(
    private spinner: NgxSpinnerService,
    private _snackBar: MatSnackBar,
    public categoryService: CategoryService,
    public lawService: LawService,
    public route: ActivatedRoute
  ) { }

  laws: Proyecto[];
  currentCategory: Category = new Category;
  id = '';

  public config: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: 1,
    centeredSlides: true,
    keyboard: true,
    mousewheel: true,
    spaceBetween: 100,
    speed: 900,
    scrollbar: false,
    navigation: true,
    pagination: false
  };

  private scrollbar: SwiperScrollbarInterface = {
    el: '.swiper-scrollbar',
    hide: false,
    draggable: true
  };

  private pagination: SwiperPaginationInterface = {
    el: '.swiper-pagination',
    clickable: true,
    hideOnClick: false
  };

  ngOnInit() {
    this.spinner.show();
    this.route.params.subscribe(params => {
      this.id = params['categoria'];
    });

    this.categoryService.getOneById(this.id).subscribe((category: Category) => {
      this.currentCategory = category;
    });

    this.lawService.getAllByCategoryId(this.id).subscribe((laws: Proyecto[]) => {
      this.laws = laws;
      this.laws.map(law => law.descripcion = law.descripcion.substr(0, 300) + '...');
      this.spinner.hide();
    }, error => {
      this._snackBar.open(error.message, "error", {
        duration: 1000,
        announcementMessage: 'Holis',
        panelClass: 'error-panel',
        politeness: 'polite'
      });
      this.spinner.hide();
    });
  }

  public toggleDirection(): void {
    this.config.direction =
      this.config.direction === 'horizontal' ? 'vertical' : 'horizontal';
  }

  public toggleSlidesPerView(): void {
    if (this.config.slidesPerView !== 1) {
      this.config.slidesPerView = 1;
    } else {
      this.config.slidesPerView = 2;
    }
  }

  public toggleOverlayControls(): void {
    if (this.config.navigation) {
      this.config.scrollbar = false;
      this.config.navigation = false;

      this.config.pagination = this.pagination;
    } else if (this.config.pagination) {
      this.config.navigation = false;
      this.config.pagination = false;

      this.config.scrollbar = this.scrollbar;
    } else {
      this.config.scrollbar = false;
      this.config.pagination = false;

      this.config.navigation = true;
    }
  }

  public toggleKeyboardControl(): void {
    this.config.keyboard = !this.config.keyboard;
  }

  public toggleMouseWheelControl(): void {
    this.config.mousewheel = !this.config.mousewheel;
  }

  public onIndexChange(index: number): void {
    console.log('Swiper index: ', index);
  }

  public onSwiperEvent(event: string): void {
    console.log('Swiper event: ', event);
  }

  onClickNext() {

  }
}
