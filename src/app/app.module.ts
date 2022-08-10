import { NgModule } from '@angular/core';
import { SharedModule } from './shared-module/shared.module';
import { DirectivesModule } from './shared-module/directives/directives.module';

import { AppComponent } from './app.component';
import { PortfolioComponent } from './home-module/components/portfolio/portfolio.component';
import { AboutComponent } from './home-module/components/about/about.component';
import { HeadingComponent } from './home-module/components/heading/heading.component';
import { PricingComponent } from './home-module/components/pricing/pricing.component';
import { BlogComponent } from './home-module/components/blog/blog.component';
import { ContactComponent } from './home-module/components/contact/contact.component';
import { ContactDialogComponent } from './home-module/components/contact-dialog/contact-dialog.component';
import { HomeComponent } from './home-module/components/home/home.component';
import { LoginComponent } from './home-module/components/login/login.component';
import { SignupComponent } from './home-module/components/signup/signup.component';
import { LawsComponent } from './home-module/components/laws/laws.component';
import { ProyectoComponent } from './home-module/components/proyecto/proyecto.component';
import { CategoriesComponent } from './home-module/components/categories/categories.component';

import { AuthInterceptorService } from './interceptors/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MyAccountComponent } from './home-module/components/my-account/my-account.component';
import { UserListComponent } from './admin-module/components/user-list/user-list.component';
import { VerificationComponent } from './admin-module/components/verification/verification.component';
import { ReportsComponent } from './admin-module/components/reports/reports.component';
import { CategoryReportComponent } from './admin-module/components/category-report/category-report.component';
import { LocationReportComponent } from './admin-module/components/location-report/location-report.component';
import { GeneralReportComponent } from './admin-module/components/general-report/general-report.component';
import { ProyectsReportComponent } from './admin-module/components/proyects-report/proyects-report.component';

@NgModule({
  declarations: [
    AppComponent,
    PortfolioComponent,
    AboutComponent,
    HeadingComponent,
    PricingComponent,
    BlogComponent,
    UserListComponent,
    VerificationComponent,
    HomeComponent,
    ContactComponent,
    ContactDialogComponent,
    LoginComponent,
    SignupComponent,
    LawsComponent,
    ProyectoComponent,
    CategoriesComponent,
    MyAccountComponent,
    ReportsComponent,
    CategoryReportComponent,
    LocationReportComponent,
    GeneralReportComponent,
    ProyectsReportComponent
  ],
  imports: [
    SharedModule,
    DirectivesModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }],
  entryComponents: [ContactDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
