export class ReturnProdutoSolicitacaoDto {
    id: number;
    solicitacaoCompraId: number;
    codigo_produto: string;
    quantidade: number;
    controle?: string;
    descricao?: string;
  }  