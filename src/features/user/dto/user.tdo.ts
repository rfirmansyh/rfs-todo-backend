import { TUserRole } from '@/types/user.type';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  role: TUserRole;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}

export class UserLoginPayloadDto {
  @ApiProperty({
    description: 'Email / Username',
    example: 'rahmadfirmansyah.id@gmail.com',
  })
  identity: string;

  @ApiProperty({
    example: '123123',
  })
  password: string;
}

export class UserTokenDto {
  expiresIn: number;
  accessToken: string;

  constructor(data: { expiresIn: number; accessToken: string }) {
    this.expiresIn = data.expiresIn;
    this.accessToken = data.accessToken;
  }
}

export class UserLoginResultDto {
  user: UserDto;
  token: UserTokenDto;
}
