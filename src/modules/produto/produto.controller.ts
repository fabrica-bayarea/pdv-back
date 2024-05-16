import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpCode,
  Delete,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from '../enums/role.enum';
import { UseGuards } from '@nestjs/common';

@Controller('produto')
@UseGuards(JwtAuthGuard)
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Roles(Role.GERENTE)
  create(@Body() createProdutoDto: CreateProdutoDto) {
    return this.produtoService.create(createProdutoDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @Roles(Role.GERENTE)
  findAll() {
    return this.produtoService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @Roles(Role.VENDEDOR)
  findOne(@Param('id') id: string) {
    return this.produtoService.findOne(+id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @Roles(Role.GERENTE)
  update(@Param('id') id: string, @Body() updateProdutoDto: UpdateProdutoDto) {
    return this.produtoService.update(+id, updateProdutoDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Roles(Role.GERENTE)
  remove(@Param('id') id: string) {
    return this.produtoService.remove(+id);
  }
}

