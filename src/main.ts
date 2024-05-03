import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaClient } from '@prisma/client';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  if(process.env.NODE_ENV === 'development'){
    const prisma = new PrismaClient();
    // Cria a role de gerente se ela ainda não existir
    const gerenteRole = await prisma.role.upsert({
      where: { nome: 'GERENTE' },
      update: {},
      create: { nome: 'GERENTE' },
    });
    try{
      await prisma.usuario.create({
        data: {
          nome: process.env.NOME_USUARIO,
          email: process.env.EMAIL_USUARIO,
          senha: process.env.SENHA_USUARIO,
          roleId: gerenteRole.id,
        },
      });
    }catch(err){
      console.log('Base de dados já está populada');
    }finally {
      await prisma.$disconnect();
    }
  }
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',  
  });
  await app.listen(3000);
}
bootstrap();
