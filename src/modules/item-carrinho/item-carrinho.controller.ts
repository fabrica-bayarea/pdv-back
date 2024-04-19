import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ItemCarrinhoService } from './item-carrinho.service';
import { CreateItemCarrinhoDto } from './dto/create-item-carrinho.dto';
import { UpdateItemCarrinhoDto } from './dto/update-item-carrinho.dto';

@Controller('item-carrinho')
export class ItemCarrinhoController {
  constructor(private readonly itemCarrinhoService: ItemCarrinhoService) {}

  @Post()
  create(@Body() createItemCarrinhoDto: CreateItemCarrinhoDto) {
    return this.itemCarrinhoService.create(createItemCarrinhoDto);
  }

  @Get()
  findAll() {
    return this.itemCarrinhoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemCarrinhoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateItemCarrinhoDto: UpdateItemCarrinhoDto) {
    return this.itemCarrinhoService.update(+id, updateItemCarrinhoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemCarrinhoService.remove(+id);
  }
}
