import { ApiProperty, OmitType } from '@nestjs/swagger';
import { UserDto } from './user.tdo';

export class CreateUserDto extends OmitType(UserDto, [
  'id',
  'created_at',
  'updated_at',
  'role',
] as const) {
  @ApiProperty()
  password: string;
}
