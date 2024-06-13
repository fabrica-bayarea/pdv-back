import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MetodoPagamentoService } from './metodo-pagamento.service';
import { CreateMetodoPagamentoDto } from './dto/create-metodo-pagamento.dto';
import { UpdateMetodoPagamentoDto } from './dto/update-metodo-pagamento.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from '../enums/role.enum';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { UseGuards } from '@nestjs/common';

@Controller('metodo-pagamento')
@UseGuards(JwtAuthGuard)
export class MetodoPagamentoController {
  constructor(private readonly metodoPagamentoService: MetodoPagamentoService) {}

  @Post()
  @Roles(Role.GERENTE)
  create(@Body() createMetodoPagamentoDto: CreateMetodoPagamentoDto) {
    return this.metodoPagamentoService.create(createMetodoPagamentoDto);
  }

  @Get()
  @Roles(Role.GERENTE)
  findAll() {
    return this.metodoPagamentoService.findAll();
  }

  @Get(':id')
  @Roles(Role.GERENTE)
  findOne(@Param('id') id: string) {
    return this.metodoPagamentoService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.GERENTE)
  update(@Param('id') id: string, @Body() updateMetodoPagamentoDto: UpdateMetodoPagamentoDto) {
    return this.metodoPagamentoService.update(+id, updateMetodoPagamentoDto);
  }

  @Delete(':id')
  @Roles(Role.GERENTE)
  remove(@Param('id') id: string) {
    return this.metodoPagamentoService.remove(+id);
  }
}
