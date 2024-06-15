import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { Cliente } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { UseGuards } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from '../enums/role.enum';

@Controller('cliente')
@UseGuards(JwtAuthGuard)
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Get()
  @Roles(Role.GERENTE)
  async findAll(): Promise<Cliente[]> {
    return this.clienteService.findAllClientes();
  }

  @Get(':id')
  @Roles(Role.GERENTE)
  async findOne(@Param('id') id: string): Promise<Cliente> {
    return this.clienteService.findClienteById(parseInt(id, 10));
  }

  @Post()
  @Roles(Role.GERENTE)
  async create(@Body() clienteData: Cliente): Promise<Cliente> {
    return this.clienteService.createCliente(clienteData);
  }

  @Put(':id')
  @Roles(Role.GERENTE)
  async update(@Param('id') id: string, @Body() clienteData: Cliente): Promise<Cliente> {
    return this.clienteService.updateCliente(parseInt(id, 10), clienteData);
  }

  @Delete(':id')
  @Roles(Role.GERENTE)
  async remove(@Param('id') id: string): Promise<void> {
    this.clienteService.deleteCliente(parseInt(id, 10));
  }
}
