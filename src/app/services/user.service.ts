import { Injectable, Output, EventEmitter } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AccessToken } from '../models/token.model';
import { MatSnackBar } from '@angular/material';
import { Observable, Subject } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  isLoggedIn = new Subject();
  isRoleAdmin = new Subject();

  private baseUrl = environment.apiBasePath;

  constructor(
    public http: HttpClient,
    public router: Router,
    private _snackBar: MatSnackBar,
    private spinner: NgxSpinnerService
  ) { }

  findOneUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/api/user/${id}`);
  }

  getAllUnverifiedUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/api/user/inactive`);
  }

  verifyUser(id: number) {
    return this.http.post<User>(`${this.baseUrl}/api/user/${id}`, { 'user_verified': 1, '_method': 'PUT' });
  }

  logout() {
    this.spinner.show();
    const id = localStorage.getItem('user');

    this.http.get(`${this.baseUrl}/api/logout?token=${id}`).subscribe(data => {
      this.isLoggedIn.next(false);
      this.isRoleAdmin.next(false);
      this.spinner.hide();
      localStorage.clear();
      this.router.navigate(['/']);
      // location.reload();
    }, error => {
      localStorage.clear();
      this._snackBar.open('Su sesión ha expirado, inicie nuevamente', 'error');
      location.reload();
    });
  }

  login(user: User) {
    this.spinner.show();
    return this.http.post(`${this.baseUrl}/api/login`, { email: user.email, password: user.password }).subscribe((token: AccessToken) => {
      localStorage.setItem('user', token.user_id);
      localStorage.setItem('token', token.token);
      localStorage.setItem('role', token.rol_id);
      this.isLoggedIn.next(this.isLogged);
      this.isRoleAdmin.next(this.isAdmin);
      this.spinner.hide();
       location.reload();
    }, error => {
      localStorage.clear();
      this._snackBar.open('Error al iniciar sesión', 'error');
    });
  }

  signup(user: User) {
    return this.http.post(`${this.baseUrl}/api/register`, user);
  }

  isLogged() {
    // Acá habría que pegarle al backend con el token, si es el mismo, retorna true, si no, explota
    return !!localStorage.getItem('user');
  }

  isAdmin() {
    // Acá habría que pegarle al backend con el token, si es el mismo, retorna true, si no, explota
    return localStorage.getItem('role') === '1';
  }

  getUserInfoByToken(token: string) {
    return this.http.get(`${this.baseUrl}/api/me`);
  }
}
