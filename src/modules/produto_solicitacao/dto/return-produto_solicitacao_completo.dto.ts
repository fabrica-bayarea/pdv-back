export class ReturnProdutoSolicitacaoCompletoDto {
    id: number;
    solicitacaoCompraId: number;
    codigo_produto: string;
    nome_produto: string;
    quantidade: number;
    valor_unit: number;
    valor_subtotal: number;
    controle?: string;
    descricao?: string;
  }  