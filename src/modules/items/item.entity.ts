import { Prisma } from '@prisma/client';

export class Item implements Prisma.ItemUncheckedCreateInput {
  codigoProduto: string;
  nomeProduto: string;
  unidadeMedida: string;
  valorUnitario: number;
  grupoItem: string;
  grupoDespesa: string;
  despesa: string;
}
