import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FichaTecnicaProduto } from '@prisma/client';
import { CreateFichaTecnicaProdutoDTO } from './dto/create-ficha-tecnica.dto';
import { UpdateFichaTecnicaProdutoDTO } from './dto/update-ficha-tecnica.dto';

@Injectable()
export class FichaTecnicaService {
  constructor(private prisma: PrismaService) {}

  async getAllFichasTecnicas(): Promise<FichaTecnicaProduto[]> {
    return this.prisma.fichaTecnica.findMany();
  }

  async getFichaTecnicaById(id: number): Promise<FichaTecnicaProduto | null> {
    const fichaTecnica = await this.prisma.fichaTecnica.findUnique({
      where: { id },
    });
    if (!fichaTecnica) {
      throw new NotFoundException('FichaTecnicaProduto not found');
    }
    return fichaTecnica;
  }

  async createFichaTecnica(data: CreateFichaTecnicaProdutoDTO): Promise<FichaTecnicaProduto> {
    return this.prisma.fichaTecnica.create({
      data,
    });
  }

  async updateFichaTecnica(id: number, data: UpdateFichaTecnicaProdutoDTO): Promise<FichaTecnicaProduto> {
    await this.getFichaTecnicaById(id);
    return this.prisma.fichaTecnica.update({
      where: { id },
      data,
    });
  }

  async deleteFichaTecnica(id: number): Promise<FichaTecnicaProduto> {
    const fichaTecnica = await this.getFichaTecnicaById(id);
    return this.prisma.fichaTecnica.delete({
      where: { id },
    });
  }
}
