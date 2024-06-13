import { PartialType } from '@nestjs/mapped-types';
import { CreateMetodoPagamentoDto } from './create-metodo-pagamento.dto';

export class UpdateMetodoPagamentoDto extends PartialType(CreateMetodoPagamentoDto) {}
