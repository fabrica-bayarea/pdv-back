import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Inject } from '@nestjs/common';
import { Role } from '../enums/role.enum';
import { ROLES_KEY } from 'src/decorators/roles.decorator';

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
    console.log('Context:', context);
    const { user } = context.switchToHttp().getRequest();
    console.log('User:', user);
    if (!user) {
      return false; // Negar acesso se não houver usuário ou roles definidas
    }
    return user.role === requiredRoles;
  }
}