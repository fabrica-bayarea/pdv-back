import { Controller, Get, Post, Body, Patch, Param, Delete, Put, HttpCode, HttpStatus } from '@nestjs/common';
import { SolicitacaoCompraService } from './solicitacao_compra.service';
import { CreateSolicitacaoCompraDto } from './dto/create-solicitacao_compra.dto';
import { UpdateSolicitacaoCompraDto } from './dto/update-solicitacao_compra.dto';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from '../enums/role.enum';
import { UseGuards } from '@nestjs/common';

@Controller('solicitacao-compra')
@UseGuards(JwtAuthGuard)
export class SolicitacaoCompraController {
  constructor(private readonly solicitacaoCompraService: SolicitacaoCompraService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Roles(Role.GERENTE)
  create(@Body() createSolicitacaoCompraDto: CreateSolicitacaoCompraDto) {
    return this.solicitacaoCompraService.create(createSolicitacaoCompraDto);
  }

  @Get()
  @Roles(Role.GERENTE)
  findAll() {
    return this.solicitacaoCompraService.findAll();
  }

  @Get(':id')
  @Roles(Role.GERENTE)
  findOne(@Param('id') id: string) {
    return this.solicitacaoCompraService.findOne(+id);
  }

  @Put(':id')
  @Roles(Role.GERENTE)
  update(@Param('id') id: string, @Body() updateSolicitacaoCompraDto: UpdateSolicitacaoCompraDto) {
    return this.solicitacaoCompraService.update(+id, updateSolicitacaoCompraDto);
  }

  @Delete(':id')
  @Roles(Role.GERENTE)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.solicitacaoCompraService.remove(+id);
  }

  @Put('observacao/:id')
  @Roles(Role.GERENTE)
  addObservation(@Param('id') id: string, @Body() body: { observacao: string }) {
    const { observacao } = body;
    return this.solicitacaoCompraService.addObservation(+id, observacao);
  }
}
