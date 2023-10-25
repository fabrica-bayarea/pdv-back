export class ReturnProdutoDto {
  readonly nome: string;
  readonly marca: string;
  readonly descricao: string;
  readonly nome_categoria: string;
  readonly cnpj_fornecedor: string;
  readonly codigo_produto: string;
  readonly unidade_medida: string;
  readonly preco: number;
  readonly estoque_atual: number;
  readonly data_criacao: Date;
}
