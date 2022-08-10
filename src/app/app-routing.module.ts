import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home-module/components/home/home.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './home-module/components/login/login.component';
import { SignupComponent } from './home-module/components/signup/signup.component';
import { LawsComponent } from './home-module/components/laws/laws.component';
import { ProyectoComponent } from './home-module/components/proyecto/proyecto.component';
import { CategoriesComponent } from './home-module/components/categories/categories.component';
import { MyAccountComponent } from './home-module/components/my-account/my-account.component';
import { VerificationComponent } from './admin-module/components/verification/verification.component';
import { UserListComponent } from './admin-module/components/user-list/user-list.component';
import { ReportsComponent } from './admin-module/components/reports/reports.component';
import { CanActivateViaAuthGuard } from './interceptors/can-activate.guard';
import { GeneralReportComponent } from './admin-module/components/general-report/general-report.component';
import { LocationReportComponent } from './admin-module/components/location-report/location-report.component';
import { ProyectsReportComponent } from './admin-module/components/proyects-report/proyects-report.component';
import { CategoryReportComponent } from './admin-module/components/category-report/category-report.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent, data: { animation: 'fade' } },
  { path: 'signup', component: SignupComponent, data: { animation: 'fade' } },
  { path: 'proyectos/categoria/:categoria', component: LawsComponent, data: { animation: 'fade' } },
  { path: 'categorias', component: CategoriesComponent, data: { animation: 'fade' } },
  { path: 'proyectos/:id', component: ProyectoComponent, data: { animation: 'fade' } },
  {
    path: 'cuenta', component: MyAccountComponent,
    canActivate: [CanActivateViaAuthGuard],
  },
  {
    path: 'admin/users',
    component: UserListComponent,
    canActivate: [CanActivateViaAuthGuard],
  },
  {
    path: 'admin/users/:id',
    component: VerificationComponent,
    canActivate: [CanActivateViaAuthGuard],
  },
  {
    path: 'admin/reports',
    component: ReportsComponent,
    canActivate: [CanActivateViaAuthGuard],
  },
  {
    path: 'admin/report/general',
    component: GeneralReportComponent,
    canActivate: [CanActivateViaAuthGuard],
  },
  {
    path: 'admin/report/zona',
    component: LocationReportComponent,
    canActivate: [CanActivateViaAuthGuard],
  },
  {
    path: 'admin/report/proyectos',
    component: ProyectsReportComponent,
    canActivate: [CanActivateViaAuthGuard],
  },
  {
    path: 'admin/report/categorias',
    component: CategoryReportComponent,
    canActivate: [CanActivateViaAuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
