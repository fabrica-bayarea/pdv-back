import { Controller, Get, Post, Body, Param, Delete, Put, HttpCode, HttpStatus } from '@nestjs/common';
import { FinalizadorService } from './finalizador.service';
import { CreateFinalizadorDto } from './dto/create-finalizador.dto';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { UseGuards } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from '../enums/role.enum';

@Controller('finalizador')
@UseGuards(JwtAuthGuard)
export class FinalizadorController {
  constructor(private readonly finalizadorService: FinalizadorService) {}

  @Post()
  @Roles(Role.GERENTE)
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createFinalizadorDto: CreateFinalizadorDto) {
    return this.finalizadorService.create(createFinalizadorDto);
  }

  @Get()
  @Roles(Role.GERENTE)
  findAll() {
    return this.finalizadorService.findAll();
  }

  @Get(':id')
  @Roles(Role.GERENTE)
  findOne(@Param('id') id: string) {
    return this.finalizadorService.findOne(+id);
  }

  @Put(':id')
  @Roles(Role.GERENTE)
  update(@Param('id') id: string, @Body() updateFinalizadorDto: CreateFinalizadorDto) {
    return this.finalizadorService.update(+id, updateFinalizadorDto);
  }

  @Delete(':id')
  @Roles(Role.GERENTE)
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    return await this.finalizadorService.remove(+id);
  }
}
