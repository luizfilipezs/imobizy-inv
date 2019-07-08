export class AuditedItem {
  id: number;
  qntd: number;
  dataAuditoria: string;
  constructor(id: number, qntd?: number) {
    this.id = id;
    this.qntd = 1;
    this.dataAuditoria = new Date().toDateString();
  }
}

export class Audit {
  id: number;
  docNum: number;
  itens: AuditedItem[];
  ultimaAlteracao: string;
  constructor(id: number, docNum: number) {
    this.id = id;
    this.docNum = docNum;
    this.itens = [];
    this.ultimaAlteracao = new Date().toDateString();
  }
}