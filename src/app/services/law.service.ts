import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Proyecto as Proyecto } from '../models/laws.model';

@Injectable({
  providedIn: 'root'
})
export class LawService {
  private baseUrl = environment.apiBasePath;
  proyectos: Proyecto[] = [];
  constructor(public http: HttpClient) { }

  getAll() {
    return this.http.get(`${this.baseUrl}/api/proyectos-ley`);
  }

  getAllByCategoryId(id: string) {
    return this.http.get(`${this.baseUrl}/api/categorias/${id}/proyectos-ley`);
  }

  getOneById(id: string) {
    return this.http.get(`${this.baseUrl}/api/proyectos-ley/${id}`);
  }
}
