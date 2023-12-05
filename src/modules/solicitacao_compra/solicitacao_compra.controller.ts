import { Controller, Get, Post, Body, Patch, Param, Delete, Put, HttpCode, HttpStatus } from '@nestjs/common';
import { SolicitacaoCompraService } from './solicitacao_compra.service';
import { CreateSolicitacaoCompraDto } from './dto/create-solicitacao_compra.dto';
import { UpdateSolicitacaoCompraDto } from './dto/update-solicitacao_compra.dto';

@Controller('solicitacao-compra')
export class SolicitacaoCompraController {
  constructor(private readonly solicitacaoCompraService: SolicitacaoCompraService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createSolicitacaoCompraDto: CreateSolicitacaoCompraDto) {
    return this.solicitacaoCompraService.create(createSolicitacaoCompraDto);
  }

  @Get()
  findAll() {
    return this.solicitacaoCompraService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.solicitacaoCompraService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateSolicitacaoCompraDto: UpdateSolicitacaoCompraDto) {
    return this.solicitacaoCompraService.update(+id, updateSolicitacaoCompraDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.solicitacaoCompraService.remove(+id);
  }

  @Put('observacao/:id')
  addObservation(@Param('id') id: string, @Body() body: { observacao: string }) {
    const { observacao } = body;
    return this.solicitacaoCompraService.addObservation(+id, observacao);
  }
}
