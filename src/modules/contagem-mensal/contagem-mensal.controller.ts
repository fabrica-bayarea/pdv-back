import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ContagemMensalService } from './contagem-mensal.service';
import { ContagemMensal } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { UseGuards } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from '../enums/role.enum';

@Controller('contagem-mensal')
@UseGuards(JwtAuthGuard)
export class ContagemMensalController {
  constructor(private contagemMensalService: ContagemMensalService) {}

  @Get()
  @Roles(Role.GERENTE)
  async findAll(): Promise<ContagemMensal[]> {
    return this.contagemMensalService.findAllContagemMensal(); 
  }

  @Get(':id')
  @Roles(Role.GERENTE)
  async findOne(@Param('id') id: string): Promise<ContagemMensal> {
    return this.contagemMensalService.findContagemMensalById(parseInt(id, 10));
  }

  @Post()
  @Roles(Role.GERENTE)
  async create(@Body() contagemMensalData: ContagemMensal): Promise<ContagemMensal> {
    return this.contagemMensalService.createContagemMensal(contagemMensalData); 
  }

  @Put(':id')
  @Roles(Role.GERENTE)
  async update(@Param('id') id: string, @Body() contagemMensalData: ContagemMensal): Promise<ContagemMensal> {
    return this.contagemMensalService.updateContagemMensal(parseInt(id, 10), contagemMensalData); 
  }

  @Delete(':id')
  @Roles(Role.GERENTE)
  async remove(@Param('id') id: string): Promise<void> {
    this.contagemMensalService.deleteContagemMensal(parseInt(id, 10));
  }
}