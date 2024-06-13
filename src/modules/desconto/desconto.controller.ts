import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DescontoService } from './desconto.service';
import { CreateDescontoDto } from './dto/create-desconto.dto';
import { UpdateDescontoDto } from './dto/update-desconto.dto';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { UseGuards } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from '../enums/role.enum';

@Controller('desconto')
@UseGuards(JwtAuthGuard)
export class DescontoController {
  constructor(private readonly descontoService: DescontoService) {}

  @Post()
  @Roles(Role.GERENTE)
  create(@Body() createDescontoDto: CreateDescontoDto) {
    return this.descontoService.create(createDescontoDto);
  }

  @Get()
  @Roles(Role.GERENTE)
  findAll() {
    return this.descontoService.findAll();
  }

  @Get(':id')
  @Roles(Role.GERENTE)
  findOne(@Param('id') id: string) {
    return this.descontoService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.GERENTE)
  update(@Param('id') id: string, @Body() updateDescontoDto: UpdateDescontoDto) {
    return this.descontoService.update(+id, updateDescontoDto);
  }

  @Delete(':id')
  @Roles(Role.GERENTE)
  remove(@Param('id') id: string) {
    return this.descontoService.remove(+id);
  }
}
