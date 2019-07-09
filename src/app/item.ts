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
  constructor(
    id: number,
    descricao?: string,
    marca?: string,
    modelo?: string,
    complemento?: string,
    serie?: string,
    fotos?: string[],
    local?: string) {
    this.id = id;
    this.descricao = descricao || '';
    this.marca = marca || '';
    this.modelo = modelo || '';
    this.complemento = complemento || '';
    this.serie = serie || '';
    this.fotos = fotos || [];
    this.local = local || '';
    this.ultimaAlteracao = new Date();
  }
}