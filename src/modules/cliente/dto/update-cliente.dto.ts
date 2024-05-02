import { PartialType } from '@nestjs/mapped-types';
import { CreateClienteDTO } from './create-cliente.dto';

export class UpdateClienteDTO {
    cpf?: string;
    email?: string;
    nome?: string;
    telefone?: string;
    endereco?: string;
    data_nascimento?: Date;
  }
  