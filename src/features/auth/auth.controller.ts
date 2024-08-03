import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserDto, UserLoginPayloadDto } from '../user/dto/user.tdo';
import { CreateUserDto } from '@/features/user/dto/user-create.dto';
import { Auth, AuthUser } from '@/decorators/http.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    type: UserDto,
  })
  login(@Body() userLoginPayloadDto: UserLoginPayloadDto) {
    return this.authService.login(userLoginPayloadDto);
  }

  @Post('register')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    type: UserDto,
  })
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Get('me')
  @HttpCode(HttpStatus.OK)
  @Auth(['user'])
  @ApiResponse({ type: UserDto })
  getCurrentUser(@AuthUser() user: UserLoginPayloadDto): UserLoginPayloadDto {
    return user;
  }
}
