import { ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dtos/todo-create.dto';
import { UpdateTodoDto } from './dtos/todo-update.dto';
import { TodoDto } from './dtos/todo.dto';
import { Auth, AuthUser } from '@/decorators/http.decorator';
import { UserDto } from '@/features/user/dto/user.tdo';
import { User } from '@/features/user/user.entity';

@ApiTags('todo')
@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  @Auth(['user'])
  @ApiResponse({ isArray: true, type: TodoDto })
  async findAll(@AuthUser() user: UserDto): Promise<TodoDto[]> {
    return this.todoService.findAll(user.id);
  }

  @Get(':id')
  @Auth(['user'])
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ type: TodoDto })
  async findOne(@Param('id') id: string) {
    return this.todoService.findOne(id);
  }

  @Post()
  @Auth(['user'])
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ type: TodoDto })
  async create(@Body() createTodoDto: CreateTodoDto, @AuthUser() user: User) {
    return this.todoService.create(createTodoDto, user.id);
  }

  @Patch(':id')
  @Auth(['user'])
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ type: TodoDto })
  async update(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
    @AuthUser() user: User,
  ) {
    return this.todoService.update(id, updateTodoDto, user.id);
  }

  @Delete(':id')
  @Auth(['user'])
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiResponse({ type: TodoDto })
  async delete(@Param('id') id: string) {
    return this.todoService.delete(id);
  }
}
