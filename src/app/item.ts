export class Item {
  id: number;
  descricao: string;
  marca: string;
  modelo: string;
  complemento: string;
  serie: string;
  fotos: string[];
  local: string;
  ultimaAlteracao: Date;
  constructor(id: number) {
    this.id = id;
  }
}