import { BadRequestException } from '@nestjs/common';

export enum Role {
    GERENTE = 1,
    ESTOQUE = 2,
    VENDEDOR = 3,
    ADMINISTRATIVO = 4,
    FINANCEIRO = 5,
    MARKETING = 6,
    LOGISTICA = 7,
}

export class RoleUtils {
    static findEnum(id: number): Role {
        switch(id) {
            case Role.GERENTE:
                return Role.GERENTE;
            case Role.ESTOQUE:
                return Role.ESTOQUE;
            case Role.VENDEDOR:
                return Role.VENDEDOR;
            case Role.ADMINISTRATIVO:
                return Role.ADMINISTRATIVO;
            case Role.FINANCEIRO:
                return Role.FINANCEIRO;
            case Role.MARKETING:
                return Role.MARKETING;
            case Role.LOGISTICA:
                return Role.LOGISTICA;   
            default:
                throw new BadRequestException(`Role não encontrada`);
        }
    }

    static findEnumByString(enumString: string): Role {
        switch(enumString) {
            case 'GERENTE':
                return Role.GERENTE;
            case 'ESTOQUE':
                return Role.ESTOQUE;
            case 'VENDEDOR':
                return Role.VENDEDOR;
            case "ADMINISTRATIVO":
                return Role.ADMINISTRATIVO;
            case "FINANCEIRO":
                return Role.FINANCEIRO;
            case "MARKETING":
                return Role.MARKETING;
            case "LOGISTICA":
                return Role.LOGISTICA;  
            default:
                throw new BadRequestException(`Role não encontrada`);
        }
    }

    static getStringById(roleId: number): string {
        switch (roleId) {
            case Role.GERENTE:
                return 'GERENTE';
            case Role.ESTOQUE:
                return 'ESTOQUE';
            case Role.VENDEDOR:
                return 'VENDEDOR';
            case Role.ADMINISTRATIVO:
                return "ADMINISTRATIVO";
            case Role.FINANCEIRO:
                return "FINANCEIRO";
            case Role.MARKETING:
                return "MARKETING";
            case Role.LOGISTICA:
                return "LOGISTICA";  
          default:
            throw new BadRequestException(`Role não encontrada`);
        }
    }

    // Nova função para obter nomes de funções a partir de um vetor de IDs
    static getStringsByIds(roleIds: number[]): string[] {
        const roleNames: string[] = [];
        for (const roleId of roleIds) {
            const roleName = this.getStringById(roleId);
            if (roleName) {
                roleNames.push(roleName);
            } else {
                throw new BadRequestException(`Role não encontrada`);
            }
        }
        return roleNames;
    }
}