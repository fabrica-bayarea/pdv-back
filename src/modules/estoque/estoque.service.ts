import { PrismaService } from './../../prisma/prisma.service';
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { ProdutoEstoqueDTO } from './dto/produto_estoque.dto';

@Injectable()
export class EstoqueService {

    constructor(private prismaService:PrismaService){}

    async salvarEstoque(estoque:ProdutoEstoqueDTO):Promise<string>{
        if(estoque.id){
            throw new BadRequestException('Não é permitido informar o ID!');
        }
        const produto = await this.prismaService.produto.findFirst({where:{id:estoque.id_produto}});
        const produtoEstoqueExistente = await this.prismaService.produtoEstoque.findFirst({where:{id_produto:estoque.id_produto}});
        if(produtoEstoqueExistente){
            throw new BadRequestException('Já existe um estoque para este produto!');
        }
        if(!produto){
            throw new BadRequestException('Produto não encontrado!');
        }
        await this.prismaService.produtoEstoque.create({data:estoque});
        return 'Estoque salvo com sucesso!';
    }
    async atualizarEstoque(estoque:ProdutoEstoqueDTO):Promise<string>{
        if(!estoque.id){
            throw new BadRequestException('É necessário informar o ID!');
        }
        const produto = await this.prismaService.produto.findFirst({where:{id:estoque.id_produto}});
        if(!produto){
            throw new BadRequestException('Produto não encontrado!');
        }
        await this.prismaService.produtoEstoque.update({where:{id:estoque.id},data:estoque});
        return 'Estoque atualizado com sucesso!';
    }

    async buscarEstoque(id_produto:number):Promise<ProdutoEstoqueDTO>{
        if(!id_produto){
            throw new BadRequestException('É necessário informar o ID do produto!');
        }
        const estoque = await this.prismaService.produtoEstoque.findFirst({where:{id_produto:Number(id_produto)},include:{produto:true}});
        if(!estoque){
            throw new NotFoundException('Estoque não encontrado!');
        }
        return estoque;
    }
}
