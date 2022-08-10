import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { EthcontractService } from './ethcontract.service';

@Injectable({
    providedIn: 'root'
  })

  export class VotacionService {
    constructor(public http: HttpClient) {}
    private baseUrl = environment.apiBasePath;

    votar(user: number, proyecto: number, accion: string) {
      
      return this.http.post(`${this.baseUrl}/api/votos-proyectos`, { user_id: user, proyecto_id: proyecto, voto: accion });
    }

    votarArticulo(user: number, idProyecto: number, numeroArticulo: number, accion: string) {
      return this.http.post(`${this.baseUrl}/api/votos-articulos`,
      { user_id: user, articulo_id: numeroArticulo, voto: accion, proyecto_id: idProyecto }
      );
    }
  }
