import { OmitType } from '@nestjs/swagger';
import { TodoDto } from './todo.dto';

export class CreateTodoDto extends OmitType(TodoDto, [
  'id',
  'created_at',
  'updated_at',
  'user',
  'user_id',
] as const) {}
