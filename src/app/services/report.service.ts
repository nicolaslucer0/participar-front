import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Proyecto as Proyecto } from '../models/laws.model';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private baseUrl = environment.apiBasePath;
  proyectos: Proyecto[] = [];
  constructor(public http: HttpClient) { }

  getDefaultStatictics(params: any) {
    return this.http.get(`${this.baseUrl}/api/estadisticas/cantidad-votos`, { params: params });
  }

  getParticipationIndex() {
    return this.http.get(`${this.baseUrl}/api/estadisticas/users/participacion`);
  }

  getReportByCategories(params: any) {
    return this.http.get(`${this.baseUrl}/api/estadisticas/categorias/cantidad-votos`, { params: params });
  }

  getReportByProyectos(params: any) {
    return this.http.get(`${this.baseUrl}/api/estadisticas/proyecto/cantidad-votos`, { params: params });
  }

  getReportByProvincias(params: any) {
    return this.http.get(`${this.baseUrl}/api/estadisticas/provincia/cantidad-votos`, { params: params });
  }
}
