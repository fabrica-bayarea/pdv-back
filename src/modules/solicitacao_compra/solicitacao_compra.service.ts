import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSolicitacaoCompraDto } from './dto/create-solicitacao_compra.dto';
import { UpdateSolicitacaoCompraDto } from './dto/update-solicitacao_compra.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReturnSolicitacaoCompraDto } from './dto/return-solicitacao_compra.dto';
import { ClienteService } from '../cliente/cliente.service';
import { VendedorService } from '../vendedor/vendedor.service';

@Injectable()
export class SolicitacaoCompraService {
  private ativo = true;
  constructor(
    private readonly prisma: PrismaService,
    private readonly clienteService: ClienteService,
    private readonly vendedorService: VendedorService,
  ) {}

  async create(createSolicitacaoCompraDto: CreateSolicitacaoCompraDto) {
    const { clienteId, vendedorId, observacao } = createSolicitacaoCompraDto;
    
    // Verificar se o cliente existe
    const clienteExists = await this.clienteService.findClienteById(clienteId);
    if (!clienteExists) {
      throw new NotFoundException(`Cliente com ID ${clienteId} não encontrado.`);
    }

    // Verificar se o vendedor existe
    const vendedorExists = await this.vendedorService.findOne(vendedorId);
    if (!vendedorExists) {
      throw new NotFoundException(`Vendedor com ID ${vendedorId} não encontrado.`);
    }

    // Verificar se existe uma solicitação ativa para o mesmo vendedor
    const existingSolicitacao = await this.prisma.solicitacaoCompra.findFirst({
      where: {
        vendedorId,
        ativo: true,
      },
    });

    if (existingSolicitacao) {
      throw new ConflictException(`O vendedor com ID ${vendedorId} já possui uma solicitação ativa.`);
    }
    
    const solicitacaoCompra = await this.prisma.solicitacaoCompra.create({
      data: {
        clienteId,
        vendedorId, 
        ativo: this.ativo,
        observacao,
      },
    });

    return solicitacaoCompra;
  }

  async findAll(): Promise<ReturnSolicitacaoCompraDto[]> {
    const solicitacoesCompra = await this.prisma.solicitacaoCompra.findMany();
    return solicitacoesCompra;
  }

  async findOne(id: number): Promise<ReturnSolicitacaoCompraDto> {
    const solicitacaoCompra = await this.prisma.solicitacaoCompra.findUnique({
      where: { id },
    });

    if (!solicitacaoCompra) {
      throw new NotFoundException(`Solicitação de compra #${id} não encontrada`);
    }

    return solicitacaoCompra;
  }

  async update(id: number, updateSolicitacaoCompraDto: UpdateSolicitacaoCompraDto): Promise<ReturnSolicitacaoCompraDto> {
    const solicitacaoCompra = await this.prisma.solicitacaoCompra.findUnique({
      where: { id },
    });

    if (!solicitacaoCompra) {
      throw new NotFoundException(`Solicitação de compra com ID ${id} não encontrada`);
    }

    const { clienteId, vendedorId,observacao } = updateSolicitacaoCompraDto;

    const updatedSolicitacaoCompra = await this.prisma.solicitacaoCompra.update({
      where: { id },
      data: {
        clienteId,
        vendedorId,
        ativo: this.ativo,
        observacao,
      },
    });

    return updatedSolicitacaoCompra;
  }

  async remove(id: number): Promise<void> {
    const solicitacaoCompra = await this.prisma.solicitacaoCompra.findUnique({
      where: { id },
    });

    if (!solicitacaoCompra) {
      throw new NotFoundException(`Solicitação de compra com ID ${id} não encontrada`);
    }

    await this.prisma.solicitacaoCompra.delete({
      where: { id },
    });
  }

  async addObservation(id: number, obs: string): Promise<ReturnSolicitacaoCompraDto> {
    const solicitacaoCompra = await this.prisma.solicitacaoCompra.findUnique({
      where: { id },
    });

    if (!solicitacaoCompra) {
      throw new NotFoundException(`Solicitação de compra com ID ${id} não encontrada`);
    }

    const updatedSolicitacaoCompra = await this.prisma.solicitacaoCompra.update({
      where: { id },
      data: {
        observacao: obs,
      },
    });

    return updatedSolicitacaoCompra;
  }
  async desativar(solicitacaoCompraId: number): Promise<ReturnSolicitacaoCompraDto> {
    const solicitacaoCompra = await this.prisma.solicitacaoCompra.findUnique({
      where: { id: solicitacaoCompraId },
    });

    if (!solicitacaoCompra) {
      throw new NotFoundException(`Solicitação de compra com ID ${solicitacaoCompraId} não encontrada`);
    }

    const updatedSolicitacaoCompra = await this.prisma.solicitacaoCompra.update({
      where: { id: solicitacaoCompraId },
      data: {
        ativo: false,
      },
    });

    return updatedSolicitacaoCompra;
  }
}
