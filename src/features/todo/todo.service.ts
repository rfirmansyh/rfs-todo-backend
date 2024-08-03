import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dtos/todo-create.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateTodoDto } from './dtos/todo-update.dto';
import { Todo } from './todo.entity';
import { TodoDto } from './dtos/todo.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async findAll(user_id: number): Promise<TodoDto[]> {
    const todos = await this.todoRepository.find({
      where: { user_id },
      relations: ['user'],
    });
    return plainToInstance(TodoDto, todos);
  }

  async findOne(id: string): Promise<TodoDto> {
    const todo = await this.todoRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    return plainToInstance(TodoDto, todo);
  }

  create(createTodoDto: CreateTodoDto, user_id: number): Promise<TodoDto> {
    const todo = this.todoRepository.create({
      ...createTodoDto,
      user_id,
    });
    return this.todoRepository.save(todo);
  }

  async update(
    id: string,
    updateTodoDto: UpdateTodoDto,
    user_id: number,
  ): Promise<TodoDto> {
    const entity = await this.todoRepository.preload({
      id,
      ...updateTodoDto,
      user_id,
    });
    if (!entity) {
      throw new NotFoundException(`Entity with ID ${id} not found`);
    }
    return await this.todoRepository.save(entity);
  }

  async delete(id: string): Promise<TodoDto> {
    const entity = await this.todoRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException(`Entity with ID ${id} not found`);
    }

    await this.todoRepository.delete(id);
    return entity;
  }
}
