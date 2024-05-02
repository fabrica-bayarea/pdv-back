import { IsNotEmpty, IsString, Length, IsNumber } from 'class-validator';

export class CreateContagemMensalDTO {
    @IsNotEmpty()
    @IsNumber()
    mes: number;

    @IsNotEmpty()
    @IsNumber()
    ano: number;

    @IsString()
    localizacao?: string;

    @IsNotEmpty()
    @IsString()
    responsavel: string;

    @IsNotEmpty()
    dataHoraContagem: Date;

    @IsString()
    observacoes?: string;
}
