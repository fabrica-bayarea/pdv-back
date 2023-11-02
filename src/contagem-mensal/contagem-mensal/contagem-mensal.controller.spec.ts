import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { NotaFiscalEntradaService } from './nota-fiscal-entrada.service';
import { Prisma, NotaFiscalEntrada } from '@prisma/client';

@Controller('nota-fiscal-entrada')
export class NotaFiscalEntradaController {
  constructor(private readonly notaFiscalEntradaService: NotaFiscalEntradaService) {}

  @Post()
  create(@Body() data: Prisma.NotaFiscalEntradaCreateInput): Promise<NotaFiscalEntrada> {
    return this.notaFiscalEntradaService.create(data);
  }

  @Get()
  findAll(): Promise<NotaFiscalEntrada[]> {
    return this.notaFiscalEntradaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<NotaFiscalEntrada | null> {
    return this.notaFiscalEntradaService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: Prisma.NotaFiscalEntradaUpdateInput): Promise<NotaFiscalEntrada> {
    return this.notaFiscalEntradaService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<NotaFiscalEntrada> {
    return this.notaFiscalEntradaService.remove(id);
  }
}
