import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VendaService } from './venda.service';
import { CreateVendaDto } from './dto/create-venda.dto';
import { UpdateVendaDto } from './dto/update-venda.dto';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { UseGuards } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from '../enums/role.enum';

@Controller('venda')
@UseGuards(JwtAuthGuard)
export class VendaController {
  constructor(private readonly vendaService: VendaService) {}

  @Post()
  @Roles(Role.GERENTE)
  create(@Body() createVendaDto: CreateVendaDto) {
    return this.vendaService.create(createVendaDto);
  }

  @Get()
  @Roles(Role.GERENTE)
  findAll() {
    return this.vendaService.findAll();
  }

  @Get(':id')
  @Roles(Role.GERENTE)
  findOne(@Param('id') id: string) {
    return this.vendaService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.GERENTE)
  update(@Param('id') id: string, @Body() updateVendaDto: UpdateVendaDto) {
    return this.vendaService.update(+id, updateVendaDto);
  }

  @Delete(':id')
  @Roles(Role.GERENTE)
  remove(@Param('id') id: string) {
    return this.vendaService.remove(+id);
  }
}

