import { Module } from '@nestjs/common';
import { VendedorController } from './vendedor.controller';
import { VendedorService } from './vendedor.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [VendedorController],
  providers: [VendedorService, PrismaService],
  imports: []
})
export class VendedorModule {}
