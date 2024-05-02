import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException } from '@nestjs/common';
import { CarrinhoService } from './carrinho.service';
import { Cliente } from '@prisma/client';
import { UpdateCarrinhoDTO} from './dto/update-carrinho.dto';
import { CreateCarrinhoDTO } from './dto/create-carrinho.dto';
import { ClienteService } from '../cliente/cliente.service';

@Controller('carrinho')
export class CarrinhoController {
  constructor(
    private readonly carrinhoService: CarrinhoService,
    private readonly clienteService: ClienteService,
  ) {}

  @Get(':idCliente')
  async findAllByCliente(@Param('idCliente') idCliente: number): Promise<any> {
    const cliente: Cliente = await this.clienteService.findOne(idCliente);
    if (!cliente) {
      throw new NotFoundException('Cliente não encontrado');
    }
    return this.carrinhoService.findAllByCliente(cliente); 
  }

  @Post()
  async create(@Body() createCarrinhoDto: CreateCarrinhoDTO): Promise<any> {
    return this.carrinhoService.create(createCarrinhoDto);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateCarrinhoDto: UpdateCarrinhoDTO): Promise<any> {
    return this.carrinhoService.update(id, updateCarrinhoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<any> {
    return this.carrinhoService.remove(id);
  }
}

export { CarrinhoService };
