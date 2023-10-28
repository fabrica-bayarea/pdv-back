import { ProdutoEstoqueDTO } from './dto/produto_estoque.dto';
import { EstoqueService } from './estoque.service';
import { Body, Controller, ValidationPipe, Post, Put } from '@nestjs/common';

@Controller('estoque')
export class EstoqueController {

    constructor(private estoqueService: EstoqueService) {
        
    }

    @Post()
    async salvarEstoque(@Body(new ValidationPipe({transform: true})) estoque:ProdutoEstoqueDTO){
        return await this.estoqueService.salvarEstoque(estoque);
    }

    @Put()
    async atualizarEstoque(@Body(new ValidationPipe({transform: true})) estoque:ProdutoEstoqueDTO){
        return await this.estoqueService.atualizarEstoque(estoque);
    }
}
