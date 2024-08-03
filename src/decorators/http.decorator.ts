import { AuthGuard, AuthRoleGuard } from '@/features/auth/auth.guard';
import { AuthUserInterceptor } from '@/features/auth/auth.interceptor';
import { TUserRole } from '@/types/user.type';
import {
  applyDecorators,
  createParamDecorator,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import type { CustomDecorator, ExecutionContext } from '@nestjs/common';
import { SetMetadata } from '@nestjs/common';
import { PUBLIC_ROUTE_KEY } from '@/constant/app.constant';

export const Roles = Reflector.createDecorator<string[]>();

export const PublicRoute = (isPublic = false): CustomDecorator =>
  SetMetadata(PUBLIC_ROUTE_KEY, isPublic);

export function Auth(
  roles: TUserRole[] = [],
  options?: Partial<{ public: boolean }>,
) {
  const isPublicRoute = options?.public;

  return applyDecorators(
    Roles(roles),
    UseGuards(AuthGuard({ public: isPublicRoute }), AuthRoleGuard),
    ApiBearerAuth(),
    UseInterceptors(AuthUserInterceptor),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    PublicRoute(isPublicRoute),
  );
}

export function AuthUser() {
  return createParamDecorator((_data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    const user = request.user;

    if (user?.[Symbol.for('isPublic')]) {
      return;
    }

    return user;
  })();
}
