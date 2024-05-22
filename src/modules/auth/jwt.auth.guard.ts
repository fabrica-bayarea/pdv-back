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
    if (!requiredRoles) {
      return true;
    }
    console.log(requiredRoles);
    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const { headers } = request;
    const headerString = headers.authorization.split(' ');
    const token = headerString[1];

    const user = this.decodeToken(token, process.env.JWT_SECRET_KEY);

    // Comparação direta entre o papel requerido e o papel do usuário
    if (user.role !== requiredRoles) {
      const roleUser = RoleUtils.getStringById(user.role);
      // Lança uma exceção de não autorizado se a comparação falhar
      throw new UnauthorizedException(`Usuário com role ${roleUser} não autorizado para acessar esta rota`);
    }

    return true; // Se a comparação for bem-sucedida, permite o acesso
  }

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