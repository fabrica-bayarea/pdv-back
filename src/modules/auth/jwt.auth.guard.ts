import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role, RoleUtils } from '../enums/role.enum';
import { ROLES_KEY } from 'src/decorators/roles.decorator';
import * as jwt from 'jsonwebtoken';
import { UnauthorizedException } from '@nestjs/common';

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

    // Agora, como decodeToken é um método da classe, você não precisa usar 'this'
    const user = this.decodeToken(token, process.env.JWT_SECRET_KEY);

    return user.role == requiredRoles
  }

  // Corrigido para ser um método da classe
  decodeToken(token: string, secretKey: string): any {
    try {
      const decoded = jwt.verify(token, secretKey);
      return decoded;
    } catch (err) {
      console.error('Erro ao decodificar o token:', err);
      throw new Error('Token inválido');
    }
  }
}