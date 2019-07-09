export class AuditedItem {
  id: number;
  qntd: number;
  dataAuditoria: Date;
  constructor(id: number, qntd?: number) {
    this.id = id;
    this.qntd = qntd || 1;
    this.dataAuditoria = new Date();
  }
}

export class Audit {
  id: number;
  docNum: string;
  itens: AuditedItem[];
  ultimaAlteracao: Date;
  constructor(id: number, docNum: string) {
    this.id = id;
    this.docNum = docNum;
    this.itens = [];
    this.ultimaAlteracao = new Date();
  }
}