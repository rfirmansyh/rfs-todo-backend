import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserDto } from './dto/user.tdo';
import { CreateUserDto } from './dto/user-create.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findAll(): Promise<UserDto[]> {
    return this.userRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  findOneForLogin(identity: string): Promise<User> {
    return this.userRepository.findOne({
      where: [{ username: identity }, { email: identity }],
    });
  }

  create(userTodoDto: CreateUserDto): Promise<UserDto> {
    const user: User = new User();
    user.name = userTodoDto.name;
    user.username = userTodoDto.username;
    user.email = userTodoDto.email;
    user.role = 'user';
    user.password = userTodoDto.password;

    return this.userRepository.save(user);
  }
}
