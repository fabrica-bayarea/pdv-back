import { Body, Controller, Get, Post,Delete, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UsuarioRolesDto } from './dto/usuario-roles.dto';

@Controller('usuario')
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createUsuarioDto: CreateUsuarioDto): Promise<UsuarioRolesDto> {
        return this.usuarioService.createUsuario(createUsuarioDto);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(): Promise<UsuarioRolesDto[]> {
        return this.usuarioService.getAllUsuariosWithRoles();
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteUsuario(@Param('id') id: string): Promise<void> {
        await this.usuarioService.deleteUsuario(+id);
    }
}
