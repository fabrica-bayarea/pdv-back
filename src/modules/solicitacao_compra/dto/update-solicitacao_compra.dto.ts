import { PartialType } from '@nestjs/mapped-types';
import { CreateSolicitacaoCompraDto } from './create-solicitacao_compra.dto';

export class UpdateSolicitacaoCompraDto extends PartialType(CreateSolicitacaoCompraDto) {}
