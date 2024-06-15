import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsuarioDto } from './dto/usuario.dto';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { RoleUtils } from '../enums/role.enum';
import { UsuarioRolesDto } from './dto/usuario-roles.dto';
import { BcryptUtils } from 'src/common/utils/bcrypt.utils';

@Injectable()
export class UsuarioService {
    constructor(
        private readonly prisma: PrismaService
    ){}

    async getUsuario(email:string): Promise<UsuarioDto>{
        if(!email){
            throw new BadRequestException(`O email deve ser informado`);
        }
        const usuario = await this.prisma.usuario.findUnique({
            where: {
                email: email
            }
        });
        if(!usuario){
            throw new NotFoundException(`Usuário não encontrado`);
        }
        return new UsuarioDto(usuario);
    }

    async getUsuarioRoles(id:number): Promise<any>{
        // Busca todas as funções associadas ao usuário
        const usuarioRoles = await this.prisma.usuarioRole.findMany({
            where: { usuarioId: id },
            select: { roleId: true }, // Seleciona apenas o ID da função
        });
        return usuarioRoles;
    }

    
    async createUsuario(createUsuarioDto: CreateUsuarioDto): Promise<UsuarioRolesDto> {
        const { nome, email, senha, roles } = createUsuarioDto;

        // Verificar se já existe um usuário com o mesmo email
        const usuarioExistenteEmail = await this.prisma.usuario.findUnique({
            where: { email: email },
        });
        
        if (usuarioExistenteEmail) {
            throw new BadRequestException(`O email ${email} já está em uso`);
        }
        
        // Criptografar a senha fornecida
        const senhaCriptografada = await BcryptUtils.criptografarSenha(senha);

        // Verificar se já existe um usuário com a mesma senha
        const usuariosExistentes = await this.prisma.usuario.findMany();
        for (const usuario of usuariosExistentes) {
            const isSamePassword = await BcryptUtils.compararSenhas(senha, usuario.senha);
            if (isSamePassword) {
                throw new BadRequestException(`A senha fornecida já está em uso`);
            }
        };
        
        // Transformar os nomes das roles em maiúsculas
        const rolesUpcase = roles.map(role => role.toUpperCase());

        // Verificar se os nomes das roles são válidos e obter seus IDs
        const roleIds = rolesUpcase.map(roleName => RoleUtils.findEnumByString(roleName));

        // Criar o usuário
        const usuario = await this.prisma.usuario.create({
            data: {
                nome,
                email,
                senha: senhaCriptografada,
            },
        });

        // Criar as entradas na tabela intermediária para associar o usuário com as roles
        await Promise.all(
            roleIds.map(roleId => 
                this.prisma.usuarioRole.create({
                    data: {
                        usuarioId: usuario.id,
                        roleId: roleId,
                    },
                })
            )
        );

        // Buscar o usuário pelo ID
        const usuarioCriado = await this.prisma.usuario.findUnique({
            where: { id: usuario.id },
        });

        // Buscar as roles associadas ao usuário
        const usuarioRoles = await this.prisma.usuarioRole.findMany({
            where: { usuarioId: usuario.id },
            include: {
                role: true,
            },
        });

        // Mapear os dados para o DTO
        const rolesDto = usuarioRoles.map(usuarioRole => usuarioRole.role.nome);

        return new UsuarioRolesDto({
            ...usuarioCriado,
            roles: rolesDto,
        });
    }

    async getAllUsuariosWithRoles(): Promise<UsuarioRolesDto[]> {
        // Buscar todos os usuários
        const usuarios = await this.prisma.usuario.findMany();

        // Buscar as roles associadas a cada usuário
        const usuariosComRoles = await Promise.all(
            usuarios.map(async usuario => {
                const usuarioRoles = await this.prisma.usuarioRole.findMany({
                    where: { usuarioId: usuario.id },
                    include: {
                        role: true,
                    },
                });

                // Mapear os dados para o DTO
                const rolesDto = usuarioRoles.map(usuarioRole => usuarioRole.role.nome);

                return new UsuarioRolesDto({
                    ...usuario,
                    roles: rolesDto,
                });
            })
        );

        return usuariosComRoles;
    }

    async deleteUsuario(id: number): Promise<void> {
        // Verificar se o usuário existe
        const usuarioExistente = await this.prisma.usuario.findUnique({
            where: { id: id },
        });

        if (!usuarioExistente) {
            throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
        }

        // Remover as associações de roles do usuário
        await this.prisma.usuarioRole.deleteMany({
            where: { usuarioId: id },
        });

        // Remover o usuário
        await this.prisma.usuario.delete({
            where: { id: id },
        });
    }
}
