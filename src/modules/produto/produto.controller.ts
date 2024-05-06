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
import { UseGuards } from '@nestjs/common';
import { Role } from '../enums/role.enum';
import { AuthGuard } from '@nestjs/passport';

@Controller('produto')
@UseGuards(JwtAuthGuard)
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createProdutoDto: CreateProdutoDto) {
    return this.produtoService.create(createProdutoDto);
  }

  @Get('/teste')
  @UseGuards(AuthGuard('jwt')) // Usa o guard de autenticação JWT
  getProtectedRoute() {
    return 'Esta é uma rota protegida';
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @Roles(Role.VENDEDOR)
  findAll() {
    return this.produtoService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'), JwtAuthGuard)
  @Roles(Role.GERENTE)
  findOne(@Param('id') id: string) {
    return this.produtoService.findOne(+id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() updateProdutoDto: UpdateProdutoDto) {
    return this.produtoService.update(+id, updateProdutoDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.produtoService.remove(+id);
  }
}
