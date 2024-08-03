import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@/features/user/user.service';
import { CreateUserDto } from '@/features/user/dto/user-create.dto';
import {
  UserLoginPayloadDto,
  UserLoginResultDto,
  UserTokenDto,
} from '@/features/user/dto/user.tdo';
import { User } from '@/features/user/user.entity';
import { generateHash, validateHash } from './auth.util';
import { UserNotFoundException } from '@/exceptions/user.exception';
import { JWT } from './auth.constant';
import { ETokenType } from '@/enums/app.enum';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  private async validateUser(
    userLoginPayloadDto: UserLoginPayloadDto,
  ): Promise<User> {
    const user = await this.userService.findOneForLogin(
      userLoginPayloadDto.identity,
    );

    const isPasswordValid = await validateHash(
      userLoginPayloadDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UserNotFoundException();
    }

    return user!;
  }

  async login(
    userLoginPayloadDto: UserLoginPayloadDto,
  ): Promise<UserLoginResultDto> {
    const user = await this.validateUser(userLoginPayloadDto);

    const payload = {
      userId: user.id,
      email: user.email,
      role: user.role,
      type: ETokenType.ACCESS_TOKEN,
    };
    const accessToken = await this.jwtService.signAsync(payload);

    const token = new UserTokenDto({
      accessToken,
      expiresIn: JWT.EXPIRATION_TIME,
    });

    return {
      user,
      token,
    };
  }

  async register(payload: CreateUserDto) {
    payload.password = generateHash(payload.password);

    const user = await this.userService.create(payload);
    return user;
  }
}
