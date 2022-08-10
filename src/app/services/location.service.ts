import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Provincia } from '../models/provincia.model';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private baseUrl = environment.apiBasePath;

  constructor(private http: HttpClient) { }

  getProvincias() {
    return this.http.get(`${this.baseUrl}/api/provincias`);
  }

  getMunicipios(provincia: Provincia) {
    return this.http.get(`${this.baseUrl}/api/provincias/${provincia.id}/municipios`);
  }

  getLocalidades(provincia: Provincia, localidad: Provincia) {
    return this.http.get(`${this.baseUrl}/api/provincias/${provincia.id}/municipios/${localidad.id}/localidades`);
  }
}
