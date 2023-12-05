import { PartialType } from '@nestjs/mapped-types';
import { CreateProdutoSolicitacaoDto } from './create-produto_solicitacao.dto';

export class UpdateProdutoSolicitacaoDto extends PartialType(CreateProdutoSolicitacaoDto) {}
