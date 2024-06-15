// usuario-roles.dto.ts
export class UsuarioRolesDto {
    id: number;
    nome: string;
    email: string;
    roles: string[];

    constructor(usuario: any) {
        this.id = usuario.id;
        this.nome = usuario.nome;
        this.email = usuario.email;
        this.roles = usuario.roles;
    }
}