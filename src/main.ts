import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaClient } from '@prisma/client';
import { BcryptUtils } from './common/utils/bcrypt.utils';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  if(process.env.NODE_ENV === 'development'){
    const prisma = new PrismaClient();
    await prisma.role.upsert({
      where: { nome: 'GERENTE' },
      update: {},
      create: { nome: 'GERENTE' },
    });
    await prisma.role.upsert({
      where: { nome: 'ESTOQUE' },
      update: {},
      create: { nome: 'ESTOQUE' },
    });
    await prisma.role.upsert({
      where: { nome: 'VENDEDOR' },
      update: {},
      create: { nome: 'VENDEDOR' },
    });
    await prisma.role.upsert({
      where: { nome: 'ADMINISTRATIVO' },
      update: {},
      create: { nome: 'ADMINISTRATIVO' },
    });
    await prisma.role.upsert({
      where: { nome: 'FINANCEIRO' },
      update: {},
      create: { nome: 'FINANCEIRO' },
    });
    await prisma.role.upsert({
      where: { nome: 'MARKETING' },
      update: {},
      create: { nome: 'MARKETING' },
    });
    await prisma.role.upsert({
      where: { nome: 'LOGISTICA' },
      update: {},
      create: { nome: 'LOGISTICA' },
    });
  }
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',  
  });
  await app.listen(3000);
}
bootstrap();
