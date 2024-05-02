import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException } from '@nestjs/common';
import { NotaFiscalService } from './nota-fiscal.service';
import { NotaFiscal, Prisma } from '@prisma/client';
import { CreateNotaFiscalDTO } from './dto/create-nota-fiscal.dto';


@Controller('nota-fiscal')
export class NotaFiscalController {
  prisma: any;
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
  async create(@Body() notaFiscalData: CreateNotaFiscalDTO): Promise<NotaFiscal> {
    return this.notaFiscalService.createNotaFiscal(notaFiscalData);
  }

  @Put(':id')
  async update(id: number, data: Prisma.NotaFiscalUpdateInput): Promise<NotaFiscal> {
    return this.prisma.notaFiscal.update({
      where: { id },
      data,
    });
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
