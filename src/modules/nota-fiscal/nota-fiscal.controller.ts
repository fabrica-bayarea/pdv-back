import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { NotaFiscalService } from './nota-fiscal.service';
import { NotaFiscal } from '@prisma/client';

@Controller('nota-fiscal')
export class NotaFiscalController {
  constructor(private readonly notaFiscalService: NotaFiscalService) {}

  @Get()
  async findAll(): Promise<NotaFiscal[]> {
    return this.notaFiscalService.findAllNotasFiscais();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<NotaFiscal> {
    return this.notaFiscalService.findNotaFiscalById(parseInt(id, 10));
  }

  @Post()
  async create(@Body() notaFiscalData: NotaFiscal): Promise<NotaFiscal> {
    return this.notaFiscalService.createNotaFiscal(notaFiscalData);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() notaFiscalData: NotaFiscal): Promise<NotaFiscal> {
    return this.notaFiscalService.updateNotaFiscal(parseInt(id, 10), notaFiscalData);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    this.notaFiscalService.deleteNotaFiscal(parseInt(id, 10));
  }
}
