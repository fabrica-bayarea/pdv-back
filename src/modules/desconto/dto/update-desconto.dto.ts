import { PartialType } from '@nestjs/mapped-types';
import { CreateDescontoDto } from './create-desconto.dto';

export class UpdateDescontoDto extends PartialType(CreateDescontoDto) {}
