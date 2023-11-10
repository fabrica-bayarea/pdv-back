import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException } from '@nestjs/common';
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
    try {
      return await this.notaFiscalService.findNotaFiscalById(parseInt(id, 10));
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Post()
  async create(@Body() notaFiscalData: NotaFiscal): Promise<NotaFiscal> {
    return this.notaFiscalService.createNotaFiscal(notaFiscalData);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() notaFiscalData: NotaFiscal): Promise<NotaFiscal> {
    try {
      return await this.notaFiscalService.updateNotaFiscal(parseInt(id, 10), notaFiscalData);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    try {
      await this.notaFiscalService.deleteNotaFiscal(parseInt(id, 10));
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
