import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWT } from '../auth.constant';
import { TUserRole } from '@/types/user.type';
import { ETokenType } from '@/enums/app.enum';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '@/features/user/user.entity';
import { UserService } from '@/features/user/user.service';

@Injectable()
export class JWTStrategyAuth extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT.PUBLIC_KEY,
    });
  }

  async validate(args: {
    userId: number;
    role: TUserRole;
    type: ETokenType;
  }): Promise<User> {
    if (args.type !== ETokenType.ACCESS_TOKEN) {
      throw new UnauthorizedException();
    }

    const user = await this.userService.findOne(args.userId);
    if (!user) {
      throw new UnauthorizedException();
    }

    return user!;
  }
}
