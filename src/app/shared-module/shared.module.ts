import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { HeaderComponent } from './components/header/header.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { LayoutComponent } from './components/layout/layout.component';
import { MatMenuModule } from '@angular/material/menu';
import { AppRoutingModule } from '../app-routing.module';
import { MatVideoModule } from 'mat-video';
import { SwiperModule, SwiperConfigInterface, SWIPER_CONFIG} from 'ngx-swiper-wrapper';
import { NgxSpinnerModule } from "ngx-spinner";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatExpansionModule} from '@angular/material/expansion';
import { ChartsModule } from 'ng2-charts';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CanActivateViaAuthGuard } from '../interceptors/can-activate.guard';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  observer: true,
  direction: 'horizontal',
  spaceBetween: 5,
  slidesPerView: 1,
};

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    NgxSpinnerModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    SwiperModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    ChartsModule,
    MatListModule,
    MatMenuModule,
    SweetAlert2Module.forRoot(),
    AppRoutingModule,
  ],
  exports: [
    BrowserModule,
    ChartsModule,
    SweetAlert2Module,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    MatSelectModule,
    FormsModule,
    MatSnackBarModule,
    FlexLayoutModule,
    MatVideoModule,
    HttpClientModule,
    SidenavComponent,
    MatProgressSpinnerModule,
    LayoutComponent,
    HeaderComponent,
    MatExpansionModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatTooltipModule,
    MatTabsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    AppRoutingModule,
    SwiperModule,
  ],
  providers: [{ provide: SWIPER_CONFIG, useValue: DEFAULT_SWIPER_CONFIG }, CanActivateViaAuthGuard],
  declarations: [HeaderComponent, SidenavComponent, LayoutComponent]
})
export class SharedModule {}
