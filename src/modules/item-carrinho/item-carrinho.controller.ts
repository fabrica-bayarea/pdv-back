import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ItemCarrinhoService } from './item-carrinho.service';
import { CreateItemCarrinhoDto } from './dto/create-item-carrinho.dto';
import { UpdateItemCarrinhoDto } from './dto/update-item-carrinho.dto';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { UseGuards } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from '../enums/role.enum';

@Controller('item-carrinho')
@UseGuards(JwtAuthGuard)
export class ItemCarrinhoController {
  constructor(private readonly itemCarrinhoService: ItemCarrinhoService) {}

  @Post()
  @Roles(Role.GERENTE)
  create(@Body() createItemCarrinhoDto: CreateItemCarrinhoDto) {
    return this.itemCarrinhoService.create(createItemCarrinhoDto);
  }

  @Get()
  @Roles(Role.GERENTE)
  findAll() {
    return this.itemCarrinhoService.findAll();
  }

  @Get(':id')
  @Roles(Role.GERENTE)
  findOne(@Param('id') id: string) {
    return this.itemCarrinhoService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.GERENTE)
  update(@Param('id') id: string, @Body() updateItemCarrinhoDto: UpdateItemCarrinhoDto) {
    return this.itemCarrinhoService.update(+id, updateItemCarrinhoDto);
  }

  @Delete(':id')
  @Roles(Role.GERENTE)
  remove(@Param('id') id: string) {
    return this.itemCarrinhoService.remove(+id);
  }
}
