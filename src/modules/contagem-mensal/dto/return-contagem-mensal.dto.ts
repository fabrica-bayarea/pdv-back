export class ReturnContagemMensalDTO {
    id: number;
    mes: number;
    ano: number;
    localizacao?: string;
    responsavel: string;
    dataHoraContagem: Date;
    observacoes?: string;
    //produtos: ProdutoContadoDTO[];
  }
  