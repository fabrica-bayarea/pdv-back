import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './item.dto';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from '../enums/role.enum';
import { UseGuards } from '@nestjs/common';

@Controller('items')
@UseGuards(JwtAuthGuard)
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  @Roles(Role.GERENTE)
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemsService.create(createItemDto);
  }

  @Get()
  @Roles(Role.GERENTE)
  findAll() {
    return this.itemsService.findAll();
  }

  @Get(':id')
  @Roles(Role.GERENTE)
  findOne(@Param('id') id: string) {
    return this.itemsService.findOne(+id);
  }

  @Put(':id')
  @Roles(Role.GERENTE)
  update(@Param('id') id: string, @Body() updateItemDto: CreateItemDto) {
    return this.itemsService.update(+id, updateItemDto);
  }

  @Delete(':id')
  @Roles(Role.GERENTE)
  remove(@Param('id') id: string) {
    return this.itemsService.remove(+id);
  }
}
