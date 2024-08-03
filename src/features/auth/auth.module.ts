import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { PublicStrategyAuth } from './strategy/public.strategy-auth';
import { JWT } from './auth.constant';
import { JWTStrategyAuth } from './strategy/jwt.strategy-auth';

@Module({
  imports: [
    forwardRef(() => UserModule),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      privateKey: JWT.PRIVATE_KEY,
      publicKey: JWT.PUBLIC_KEY,
      signOptions: {
        algorithm: 'RS256',
      },
      verifyOptions: {
        algorithms: ['RS256'],
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JWTStrategyAuth, PublicStrategyAuth],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
