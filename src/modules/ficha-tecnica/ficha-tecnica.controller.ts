import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { FichaTecnicaService } from './ficha-tecnica.service';
import { FichaTecnicaProduto} from '@prisma/client';
import { CreateFichaTecnicaProdutoDTO } from './dto/create-ficha-tecnica.dto';
import { UpdateFichaTecnicaProdutoDTO } from './dto/update-ficha-tecnica.dto';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { UseGuards } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from '../enums/role.enum';

@Controller('ficha-tecnica')
@UseGuards(JwtAuthGuard)
export class FichaTecnicaController {
  constructor(private readonly fichaTecnicaService: FichaTecnicaService) {}

  // TODO Descomentar
  @Get()
  @Roles(Role.GERENTE)
  async getAllFichasTecnicas(): Promise<FichaTecnicaProduto[]> {
    return this.fichaTecnicaService.getAllFichasTecnicas();
  }

  @Get(':id')
  @Roles(Role.GERENTE)
  async getFichaTecnicaById(@Param('id') id: string): Promise<FichaTecnicaProduto | null> {
    return this.fichaTecnicaService.getFichaTecnicaById(+id);
  }

  @Post()
  @Roles(Role.GERENTE)
  async createFichaTecnica(@Body() fichaTecnicaProduto: CreateFichaTecnicaProdutoDTO): Promise<FichaTecnicaProduto> {
    return this.fichaTecnicaService.createFichaTecnica(fichaTecnicaProduto);
  }

  @Put(':id')
  @Roles(Role.GERENTE)
  async updateFichaTecnica(
    @Param('id') id: string,
    @Body() fichaTecnica: UpdateFichaTecnicaProdutoDTO,
  ): Promise<FichaTecnicaProduto> {
    return this.fichaTecnicaService.updateFichaTecnica(+id, fichaTecnica);
  }

  @Delete(':id')
  @Roles(Role.GERENTE)
  async deleteFichaTecnica(@Param('id') id: string): Promise<FichaTecnicaProduto> {
    return this.fichaTecnicaService.deleteFichaTecnica(+id);
  }
}

