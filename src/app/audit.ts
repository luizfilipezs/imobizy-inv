export class AuditedItem {
  id: number;
  qntd = 1;
  dataAuditoria: Date;
}

export class Audit {
  id: number;
  docNum: number;
  itens: AuditedItem[];
  ultimaAlteracao: Date;
}