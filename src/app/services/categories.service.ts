import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(public http: HttpClient) {}
  private baseUrl = environment.apiBasePath;

    getAll() {
      return this.http.get(`${this.baseUrl}/api/categorias`);
  }
    
  getOneById(id: string) {
      return this.http.get(`${this.baseUrl}/api/categorias/${id}`);
  }
}
