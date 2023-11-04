import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ContagemMensalService } from './contagem-mensal.service';
import { ContagemMensal } from '@prisma/client';

@Controller('contagem-mensal')
export class ContagemMensalController {
  constructor(private contagemMensalService: ContagemMensalService) {}

  @Get()
  async findAll(): Promise<ContagemMensal[]> {
    return this.contagemMensalService.findAllContagemMensal(); 
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ContagemMensal> {
    return this.contagemMensalService.findContagemMensalById(parseInt(id, 10));
  }

  @Post()
  async create(@Body() contagemMensalData: ContagemMensal): Promise<ContagemMensal> {
    return this.contagemMensalService.createContagemMensal(contagemMensalData); 
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() contagemMensalData: ContagemMensal): Promise<ContagemMensal> {
    return this.contagemMensalService.updateContagemMensal(parseInt(id, 10), contagemMensalData); 
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    this.contagemMensalService.deleteContagemMensal(parseInt(id, 10));
  }
}