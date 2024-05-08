export enum Role {
    GERENTE = 1,
    ESTOQUE = 2,
    VENDEDOR = 3,
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
            default:
                throw new Error('Role não encontrada');
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
            default:
                throw new Error('Role não encontrada');
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
          default:
            throw new Error('Role não encontrada');
        }
      }
}