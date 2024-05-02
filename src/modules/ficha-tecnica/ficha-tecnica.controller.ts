import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { FichaTecnicaService } from './ficha-tecnica.service';
import { FichaTecnicaProduto} from '@prisma/client';
import { CreateFichaTecnicaProdutoDTO } from './dto/create-ficha-tecnica.dto';
import { UpdateFichaTecnicaProdutoDTO } from './dto/update-ficha-tecnica.dto';

@Controller('ficha-tecnica')
export class FichaTecnicaController {
  constructor(private readonly fichaTecnicaService: FichaTecnicaService) {}

  // TODO Descomentar
  @Get()
  async getAllFichasTecnicas(): Promise<FichaTecnicaProduto[]> {
    return this.fichaTecnicaService.getAllFichasTecnicas();
  }

  @Get(':id')
  async getFichaTecnicaById(@Param('id') id: string): Promise<FichaTecnicaProduto | null> {
    return this.fichaTecnicaService.getFichaTecnicaById(+id);
  }

  @Post()
  async createFichaTecnica(@Body() fichaTecnicaProduto: CreateFichaTecnicaProdutoDTO): Promise<FichaTecnicaProduto> {
    return this.fichaTecnicaService.createFichaTecnica(fichaTecnicaProduto);
  }

  @Put(':id')
  async updateFichaTecnica(
    @Param('id') id: string,
    @Body() fichaTecnica: UpdateFichaTecnicaProdutoDTO,
  ): Promise<FichaTecnicaProduto> {
    return this.fichaTecnicaService.updateFichaTecnica(+id, fichaTecnica);
  }

  @Delete(':id')
  async deleteFichaTecnica(@Param('id') id: string): Promise<FichaTecnicaProduto> {
    return this.fichaTecnicaService.deleteFichaTecnica(+id);
  }
}

