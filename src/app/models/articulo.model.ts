import { Requisito } from "./requisito.model";

export class Articulo {
  id: number;
  numero: string;
  contenido: string;
  requisitos: Requisito[];
  proyecto_id: string;
  positivo: number;
  negativo: number;
  abstencion: number;
  canVote: boolean;
}
