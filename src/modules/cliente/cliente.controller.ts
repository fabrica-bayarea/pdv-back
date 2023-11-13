import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { Cliente } from '@prisma/client';

@Controller('cliente')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Get()
  async findAll(): Promise<Cliente[]> {
    return this.clienteService.findAllClientes();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Cliente> {
    return this.clienteService.findClienteById(parseInt(id, 10));
  }

  @Post()
  async create(@Body() clienteData: Cliente): Promise<Cliente> {
    return this.clienteService.createCliente(clienteData);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() clienteData: Cliente): Promise<Cliente> {
    return this.clienteService.updateCliente(parseInt(id, 10), clienteData);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    this.clienteService.deleteCliente(parseInt(id, 10));
  }
}
