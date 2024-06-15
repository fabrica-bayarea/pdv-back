import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { FornecedorService } from './fornecedor.service';
import { CreateFornecedorDto } from './dto/create-fornecedor.dto';
import { UpdateFornecedorDto } from './dto/update-fornecedor.dto';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from '../enums/role.enum';
import { UseGuards } from '@nestjs/common';

@Controller('fornecedor')
@UseGuards(JwtAuthGuard)
export class FornecedorController {
  constructor(private readonly fornecedorService: FornecedorService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Roles(Role.GERENTE, Role.FINANCEIRO, Role.ADMINISTRATIVO)
  create(@Body() createFornecedorDto: CreateFornecedorDto) {
    return this.fornecedorService.create(createFornecedorDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @Roles(Role.GERENTE, Role.FINANCEIRO, Role.ADMINISTRATIVO)
  findAll() {
    return this.fornecedorService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @Roles(Role.GERENTE, Role.FINANCEIRO, Role.ADMINISTRATIVO)
  findOne(@Param('id') id: string) {
    return this.fornecedorService.findOne(+id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @Roles(Role.GERENTE, Role.FINANCEIRO, Role.ADMINISTRATIVO)
  update(
    @Param('id') id: string,
    @Body() updateFornecedorDto: UpdateFornecedorDto,
  ) {
    return this.fornecedorService.update(+id, updateFornecedorDto);
  }

  @Delete(':id')
  @Roles(Role.GERENTE, Role.FINANCEIRO, Role.ADMINISTRATIVO)
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    return await this.fornecedorService.remove(+id);
  }
}
