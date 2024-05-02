import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateClienteDTO {
    cpf: string;
    email: string;
    nome: string;
    telefone: string;
    endereco: string;
    data_nascimento: Date;
  }
  