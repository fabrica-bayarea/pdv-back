import { ReturnCarrinhoDto } from "src/modules/carrinho/dto/return-carrinho.dto";
import { ReturnProdutoDto } from "src/modules/produto/dto/return-produto.dto";

export class ReturnItemCarrinhoDto {
  id: number;
  produto: ReturnProdutoDto;
  quantidade: number;
  carrinho: ReturnCarrinhoDto;
}
