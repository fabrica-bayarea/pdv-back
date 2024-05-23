import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { VendedorService } from './vendedor.service';
import { Vendedor } from '@prisma/client'; 
import { CreateVendedorDTO } from './dto/create-vendedor.dto';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from '../enums/role.enum';
import { UseGuards } from '@nestjs/common';

@Controller('vendedor') 
@UseGuards(JwtAuthGuard)
export class VendedorController {
  constructor(private readonly vendedorService: VendedorService) {}

  @Get()
  @Roles(Role.GERENTE)
  async findAll(): Promise<Vendedor[]> {
    return this.vendedorService.findAll(); 
  }

  @Get(':id')
  @Roles(Role.GERENTE)
  async findOne(@Param('id') id: string): Promise<Vendedor> {
    return this.vendedorService.findOne(parseInt(id, 10)); 
  }

  @Post()
  @Roles(Role.GERENTE)
  async create(@Body() vendedorData: CreateVendedorDTO): Promise<Vendedor> {
    return this.vendedorService.create(vendedorData); 
  }

  @Put(':id')
  @Roles(Role.GERENTE)
  async update(@Param('id') id: string, @Body() vendedorData: CreateVendedorDTO): Promise<Vendedor> {
    return this.vendedorService.update(parseInt(id, 10), vendedorData); 
  }

  @Delete(':id')
  @Roles(Role.GERENTE)
  async remove(@Param('id') id: string): Promise<void> {
    this.vendedorService.deleteVendedor(parseInt(id, 10)); 
  }
}
