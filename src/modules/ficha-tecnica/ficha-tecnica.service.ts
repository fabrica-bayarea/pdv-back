import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FichaTecnica } from '@prisma/client';

@Injectable()
export class FichaTecnicaService {
  constructor(private prisma: PrismaService) {}

  async getAllFichasTecnicas(): Promise<FichaTecnica[]> {
    return this.prisma.fichaTecnica.findMany();
  }

  async getFichaTecnicaById(id: number): Promise<FichaTecnica | null> {
    return this.prisma.fichaTecnica.findUnique({
      where: { id },
    });
  }

  async createFichaTecnica(data: FichaTecnica): Promise<FichaTecnica> {
    return this.prisma.fichaTecnica.create({
      data,
    });
  }

  async updateFichaTecnica(id: number, data: FichaTecnica): Promise<FichaTecnica> {
    return this.prisma.fichaTecnica.update({
      where: { id },
      data,
    });
  }

  async deleteFichaTecnica(id: number): Promise<FichaTecnica> {
    return this.prisma.fichaTecnica.delete({
      where: { id },
    });
  }
}
