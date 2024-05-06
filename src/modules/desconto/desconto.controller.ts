import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DescontoService } from './desconto.service';
import { CreateDescontoDto } from './dto/create-desconto.dto';
import { UpdateDescontoDto } from './dto/update-desconto.dto';

@Controller('desconto')
export class DescontoController {
  constructor(private readonly descontoService: DescontoService) {}

  @Post()
  create(@Body() createDescontoDto: CreateDescontoDto) {
    return this.descontoService.create(createDescontoDto);
  }

  @Get()
  findAll() {
    return this.descontoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.descontoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDescontoDto: UpdateDescontoDto) {
    return this.descontoService.update(+id, updateDescontoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.descontoService.remove(+id);
  }
}
