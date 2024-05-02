import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString, IsNumber } from 'class-validator';
import { CreateContagemMensalDTO } from './create-contagem-mensal.dto';

export class UpdateContagemMensalDTO extends PartialType(CreateContagemMensalDTO) {
    @IsOptional()
    @IsNumber()
    mes: number;

    @IsOptional()
    @IsNumber()
    ano: number;

    @IsOptional()
    @IsString()
    localizacao?: string;

    @IsOptional()
    @IsString()
    responsavel?: string;

    @IsOptional()
    dataHoraContagem?: Date;

    @IsOptional()
    @IsString()
    observacoes?: string;
}
