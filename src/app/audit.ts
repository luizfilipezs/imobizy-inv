import { AuditService } from './audit.service';

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
  constructor(private auditService: AuditService) {
    this.id = auditService.generateID();
  }
}