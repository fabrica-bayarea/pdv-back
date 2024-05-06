import { IsNotEmpty, IsString, IsDateString } from 'class-validator';

export class CreateClienteDTO {
    @IsNotEmpty()
    @IsString()
    cpf: string;

    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    nome: string;

    @IsNotEmpty()
    @IsString()
    telefone: string;

    @IsNotEmpty()
    @IsString()
    endereco: string;

    @IsNotEmpty()
    @IsDateString()
    data_nascimento: Date;
}
