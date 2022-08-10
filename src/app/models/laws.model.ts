import { Articulo } from "./articulo.model";

export class Proyecto {
  id: number;
  codigo: string;
  titulo: string;
  descripcion: string;
  articulos: Articulo[] = [];
  positivo: number;
  negativo: number;
  abstencion: number;
  canVote: Boolean;
}
