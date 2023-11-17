import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { FichaTecnicaService } from './ficha-tecnica.service';
import { FichaTecnica } from '@prisma/client';

@Controller('ficha-tecnica')
export class FichaTecnicaController {
  constructor(private readonly fichaTecnicaService: FichaTecnicaService) {}

  @Get()
  async getAllFichasTecnicas(): Promise<FichaTecnica[]> {
    return this.fichaTecnicaService.getAllFichasTecnicas();
  }

  @Get(':id')
  async getFichaTecnicaById(@Param('id') id: string): Promise<FichaTecnica | null> {
    return this.fichaTecnicaService.getFichaTecnicaById(+id);
  }

  @Post()
  async createFichaTecnica(@Body() fichaTecnica: FichaTecnica): Promise<FichaTecnica> {
    return this.fichaTecnicaService.createFichaTecnica(fichaTecnica);
  }

  @Put(':id')
  async updateFichaTecnica(
    @Param('id') id: string,
    @Body() fichaTecnica: FichaTecnica,
  ): Promise<FichaTecnica> {
    return this.fichaTecnicaService.updateFichaTecnica(+id, fichaTecnica);
  }

  @Delete(':id')
  async deleteFichaTecnica(@Param('id') id: string): Promise<FichaTecnica> {
    return this.fichaTecnicaService.deleteFichaTecnica(+id);
  }
}

