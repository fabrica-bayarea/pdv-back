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
    // Cria a role de gerente se ela ainda não existir
    const gerenteRole = await prisma.role.upsert({
      where: { nome: 'GERENTE' },
      update: {},
      create: { nome: 'GERENTE' },
    });
    try {
      // Supondo que NOME_USUARIO, EMAIL_USUARIO e SENHA_USUARIO estejam definidos em seu ambiente
      const nomeUsuario = process.env.NOME_USUARIO;
      const emailUsuario = process.env.EMAIL_USUARIO;
      const senhaUsuario = process.env.SENHA_USUARIO;
  
      // Criptografa a senha antes de salvá-la
      const senhaCriptografada = await BcryptUtils.criptografarSenha(senhaUsuario);
  
      // Cria o usuário com a senha criptografada
      await prisma.usuario.create({
        data: {
          nome: nomeUsuario,
          email: emailUsuario,
          senha: senhaCriptografada, // Usa a senha criptografada
          roleId: gerenteRole.id, // Supondo que gerenteRole.id esteja definido
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
