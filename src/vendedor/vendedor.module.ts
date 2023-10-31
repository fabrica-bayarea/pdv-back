import { Module } from '@nestjs/common';
import { VendedorController } from './vendedor.controller';
import { VendedorService } from './vendedor.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [VendedorController],
  providers: [VendedorService],
  imports: [PrismaModule]
})
export class VendedorModule {}
