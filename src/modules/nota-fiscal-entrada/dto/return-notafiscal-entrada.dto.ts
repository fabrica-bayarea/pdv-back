export class CreateNotaFiscalEntradaDTO {
    numeroNota: string;
    dataEmissao: Date;
    serie?: string;
    valorTotal: number;
    valorImpostos?: number;
    condicoesPagamento?: string;
    prazoEntrega?: string;
    observacoes?: string;
    emitenteId: number;
    destinatarioId: number;
  
    toObject() {
      return {
        numeroNota: this.numeroNota,
        dataEmissao: this.dataEmissao,
        serie: this.serie,
        valorTotal: this.valorTotal,
        valorImpostos: this.valorImpostos,
        condicoesPagamento: this.condicoesPagamento,
        prazoEntrega: this.prazoEntrega,
        observacoes: this.observacoes,
        emitenteId: this.emitenteId,
        destinatarioId: this.destinatarioId,
      };
    }
  }
  