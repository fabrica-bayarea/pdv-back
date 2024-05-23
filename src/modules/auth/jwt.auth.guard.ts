import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role, RoleUtils } from '../enums/role.enum';
import { ROLES_KEY } from 'src/decorators/roles.decorator';
import * as jwt from 'jsonwebtoken';
import { UnauthorizedException } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    console.log(requiredRoles);
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const { headers } = request;

    // Verifique se o header de autorização está presente
    if (!headers.authorization) {
      throw new BadRequestException('Header de autorização ausente');
    }
    const headerString = headers.authorization.split(' ');
    
    // Verifique se o header de autorização está no formato correto
    if (headerString.length !== 2 || headerString[0] !== 'Bearer') {
      throw new BadRequestException('Formato de header de autorização inválido');
    }
    const token = headerString[1];

    const user = this.decodeToken(token, process.env.JWT_SECRET_KEY);

    // Supondo que RoleUtils.getStringById é uma função que retorna o nome do role baseado no ID
    const roleUser = RoleUtils.getStringById(user.role);

    // Itera sobre os requiredRoles para verificar se algum deles corresponde ao role do usuário
    if (!requiredRoles.some(requiredRole => requiredRole === user.role)) {
      // Lança uma exceção de não autorizado se nenhum dos requiredRoles corresponder ao role do usuário
      throw new UnauthorizedException(`Usuário com role ${roleUser} não autorizado para acessar esta rota`);
    }

    return true; // Se a comparação for bem-sucedida, permite o acesso
  }

  // Corrigido para ser um método da classe
  decodeToken(token: string, secretKey: string): any {
    try {
      const decoded = jwt.verify(token, secretKey);
      return decoded;
    } catch (err) {
      //console.error('Erro ao decodificar o token:', err);
      throw new BadRequestException('Token inválido');
    }
  }
}