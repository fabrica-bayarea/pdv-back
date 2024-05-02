import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ContagemMensalService } from './contagem-mensal.service';
import { ContagemMensal, Prisma } from '@prisma/client';

@Controller('nota-fiscal-entrada')
export class ContagemMensalController {
  constructor(private readonly ContagemMensalService: ContagemMensalService) {}

  @Post()
  create(@Body() data: Prisma.ContagemMensalCreateInput): Promise<ContagemMensal> {
    return this.ContagemMensalService.create(data);
  }

  @Get()
  findAll(): Promise<ContagemMensal[]> {
    return this.ContagemMensalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<ContagemMensal | null> {
    return this.ContagemMensalService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: Prisma.ContagemMensalUpdateInput): Promise<ContagemMensal> {
    return this.ContagemMensalService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<ContagemMensal> {
    return this.ContagemMensalService.remove(id);
  }
}
