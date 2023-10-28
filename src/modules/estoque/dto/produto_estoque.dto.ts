import { IsNotEmpty } from 'class-validator';
export class ProdutoEstoqueDTO {
    id: number;
    data_hora_entrada: Date;
    data_hora_saida: Date | null;

    @IsNotEmpty()
    quantidade: number;

    @IsNotEmpty()
    id_produto: number;
  
    constructor(
      id: number,
      data_hora_entrada: Date,
      data_hora_saida: Date | null,
      quantidade: number,
      id_produto: number
    ) {
      this.id = id;
      this.data_hora_entrada = data_hora_entrada;
      this.data_hora_saida = data_hora_saida;
      this.quantidade = quantidade;
      this.id_produto = id_produto;
    }
}