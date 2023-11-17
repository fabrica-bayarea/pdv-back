import { PartialType } from '@nestjs/mapped-types';
import { CreateFinalizadorDto } from './create-finalizador.dto';

export class UpdateFinalizadorDto extends PartialType(CreateFinalizadorDto) {}
