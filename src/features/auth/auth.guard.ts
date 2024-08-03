import { TUserRole } from '@/types/user.type';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard as NestAuthGuard, IAuthGuard, Type } from '@nestjs/passport';
import { User } from '@/features/user/user.entity';

export function AuthGuard(
  options?: Partial<{ public: boolean }>,
): Type<IAuthGuard> {
  const strategies = ['jwt'];

  if (options?.public) {
    strategies.push('public');
  }

  return NestAuthGuard(strategies);
}

@Injectable()
export class AuthRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<TUserRole[] | undefined>(
      'roles',
      context.getHandler(),
    );

    if (!roles?.length) {
      return true;
    }

    const request = context.switchToHttp().getRequest<{ user: User }>();
    const user = request.user;

    return roles.includes(user.role);
  }
}
