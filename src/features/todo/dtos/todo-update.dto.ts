import { PickType } from '@nestjs/swagger';
import { TodoDto } from './todo.dto';

export class UpdateTodoDto extends PickType(TodoDto, [
  'title',
  'content',
] as const) {}
