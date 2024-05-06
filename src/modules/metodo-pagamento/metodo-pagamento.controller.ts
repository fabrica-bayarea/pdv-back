import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MetodoPagamentoService } from './metodo-pagamento.service';
import { CreateMetodoPagamentoDto } from './dto/create-metodo-pagamento.dto';
import { UpdateMetodoPagamentoDto } from './dto/update-metodo-pagamento.dto';

@Controller('metodo-pagamento')
export class MetodoPagamentoController {
  constructor(private readonly metodoPagamentoService: MetodoPagamentoService) {}

  @Post()
  create(@Body() createMetodoPagamentoDto: CreateMetodoPagamentoDto) {
    return this.metodoPagamentoService.create(createMetodoPagamentoDto);
  }

  @Get()
  findAll() {
    return this.metodoPagamentoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.metodoPagamentoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMetodoPagamentoDto: UpdateMetodoPagamentoDto) {
    return this.metodoPagamentoService.update(+id, updateMetodoPagamentoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.metodoPagamentoService.remove(+id);
  }
}
