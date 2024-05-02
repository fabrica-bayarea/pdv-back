export class CreateNotaFiscalDTO {
  tipoDeNota: string;
  modelo: string;
  id_fornecedor: number;
  numeroDaNota: string;

  toObject() {
    return {
      tipoDeNota: this.tipoDeNota,
      modelo: this.modelo,
      id_fornecedor: this.id_fornecedor,
      numeroDaNota: this.numeroDaNota,
    };
  }
}
