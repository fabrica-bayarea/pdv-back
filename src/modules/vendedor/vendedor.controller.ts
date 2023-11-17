import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { VendedorService } from './vendedor.service';
import { Vendedor } from '@prisma/client'; 

@Controller('vendedores') 
export class VendedorController {
  constructor(private readonly vendedorService: VendedorService) {}

  @Get()
  async findAll(): Promise<Vendedor[]> {
    return this.vendedorService.findAll(); 
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Vendedor> {
    return this.vendedorService.findOne(parseInt(id, 10)); 
  }

  @Post()
  async create(@Body() vendedorData: Vendedor): Promise<Vendedor> {
    return this.vendedorService.create(vendedorData); 
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() vendedorData: Vendedor): Promise<Vendedor> {
    return this.vendedorService.update(parseInt(id, 10), vendedorData); 
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    this.vendedorService.deleteVendedor(parseInt(id, 10)); 
  }
}
