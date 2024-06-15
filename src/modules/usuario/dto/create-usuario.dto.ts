export class CreateUsuarioDto {
    nome: string;
    email: string;
    senha: string;
    roles: string[]; // Lista de nomes das roles
}