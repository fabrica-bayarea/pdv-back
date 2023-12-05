import { Controller, Get, Post, Body, Param, Delete, HttpCode, HttpStatus, Put } from '@nestjs/common';
import { ProdutoSolicitacaoService } from './produto_solicitacao.service';
import { CreateProdutoSolicitacaoDto } from './dto/create-produto_solicitacao.dto';
import { UpdateProdutoSolicitacaoDto } from './dto/update-produto_solicitacao.dto';

@Controller('produto-solicitacao')
export class ProdutoSolicitacaoController {
  constructor(private readonly produtoSolicitacaoService: ProdutoSolicitacaoService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createProdutoSolicitacaoDto: CreateProdutoSolicitacaoDto) {
    return this.produtoSolicitacaoService.create(createProdutoSolicitacaoDto);
  }

  @Get()
  findAll() {
    return this.produtoSolicitacaoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.produtoSolicitacaoService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateProdutoSolicitacaoDto: UpdateProdutoSolicitacaoDto) {
    return this.produtoSolicitacaoService.update(+id, updateProdutoSolicitacaoDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.produtoSolicitacaoService.remove(+id);
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  removeByCodigoProduto(@Body() body: { solicitacaoCompraId: number, codigo_produto: string }) {
    const { solicitacaoCompraId, codigo_produto } = body;
    return this.produtoSolicitacaoService.removeByCodigoProduto(solicitacaoCompraId, codigo_produto);
  }
  

  @Delete('cancelar/:solicitacaoCompraId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async cancelar(@Param('solicitacaoCompraId') solicitacaoCompraId: string): Promise<void> {
    return this.produtoSolicitacaoService.cancelar(+solicitacaoCompraId);
  }

  @Put('finalizar/:solicitacaoCompraId')
  async finalizar(@Param('solicitacaoCompraId') solicitacaoCompraId: string): Promise<void> {
    return this.produtoSolicitacaoService.finalizar(+solicitacaoCompraId);
  }
}
