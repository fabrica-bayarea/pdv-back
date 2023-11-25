import { Controller, Get, Post, Body, Param, Delete, Put, HttpCode, HttpStatus } from '@nestjs/common';
import { FinalizadorService } from './finalizador.service';
import { CreateFinalizadorDto } from './dto/create-finalizador.dto';

@Controller('finalizador')
export class FinalizadorController {
  constructor(private readonly finalizadorService: FinalizadorService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createFinalizadorDto: CreateFinalizadorDto) {
    return this.finalizadorService.create(createFinalizadorDto);
  }

  @Get()
  findAll() {
    return this.finalizadorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.finalizadorService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateFinalizadorDto: CreateFinalizadorDto) {
    return this.finalizadorService.update(+id, updateFinalizadorDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    return await this.finalizadorService.remove(+id);
  }
}
