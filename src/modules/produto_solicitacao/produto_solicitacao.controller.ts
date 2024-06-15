import { Controller, Get, Post, Body, Param, Delete, HttpCode, HttpStatus, Put } from '@nestjs/common';
import { ProdutoSolicitacaoService } from './produto_solicitacao.service';
import { CreateProdutoSolicitacaoDto } from './dto/create-produto_solicitacao.dto';
import { UpdateProdutoSolicitacaoDto } from './dto/update-produto_solicitacao.dto';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from '../enums/role.enum';
import { UseGuards } from '@nestjs/common';

@Controller('produto-solicitacao')
@UseGuards(JwtAuthGuard)
export class ProdutoSolicitacaoController {
  constructor(private readonly produtoSolicitacaoService: ProdutoSolicitacaoService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Roles(Role.GERENTE, Role.VENDEDOR)
  create(@Body() createProdutoSolicitacaoDto: CreateProdutoSolicitacaoDto) {
    return this.produtoSolicitacaoService.create(createProdutoSolicitacaoDto);
  }

  @Get()
  @Roles(Role.GERENTE, Role.VENDEDOR)
  findAll() {
    return this.produtoSolicitacaoService.findAll();
  }

  @Get('solicitacao/:solicitacaoCompraId')
  @Roles(Role.GERENTE, Role.VENDEDOR) 
  findAllBySolicitacao(@Param('solicitacaoCompraId') solicitacaoCompraId: string) {
    return this.produtoSolicitacaoService.findAllBySolicitacaoCompraId(+solicitacaoCompraId);
  }


  @Get(':id')
  @Roles(Role.GERENTE, Role.VENDEDOR)
  findOne(@Param('id') id: string) {
    return this.produtoSolicitacaoService.findOne(+id);
  }

  @Put(':id')
  @Roles(Role.GERENTE, Role.VENDEDOR)
  update(@Param('id') id: string, @Body() updateProdutoSolicitacaoDto: UpdateProdutoSolicitacaoDto) {
    return this.produtoSolicitacaoService.update(+id, updateProdutoSolicitacaoDto);
  }

  @Delete(':id')
  @Roles(Role.GERENTE, Role.VENDEDOR)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.produtoSolicitacaoService.remove(+id);
  }

  @Delete()
  @Roles(Role.GERENTE, Role.VENDEDOR)
  @HttpCode(HttpStatus.NO_CONTENT)
  removeByCodigoProduto(@Body() body: { solicitacaoCompraId: number, codigo_produto: string }) {
    const { solicitacaoCompraId, codigo_produto } = body;
    return this.produtoSolicitacaoService.removeByCodigoProduto(solicitacaoCompraId, codigo_produto);
  }
  

  @Delete('cancelar/:solicitacaoCompraId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Roles(Role.GERENTE, Role.VENDEDOR)
  async cancelar(@Param('solicitacaoCompraId') solicitacaoCompraId: string): Promise<void> {
    return this.produtoSolicitacaoService.cancelar(+solicitacaoCompraId);
  }

  @Put('finalizar/:solicitacaoCompraId')
  @Roles(Role.GERENTE, Role.VENDEDOR)
  async finalizar(@Param('solicitacaoCompraId') solicitacaoCompraId: string): Promise<void> {
    return this.produtoSolicitacaoService.finalizar(+solicitacaoCompraId);
  }
}
