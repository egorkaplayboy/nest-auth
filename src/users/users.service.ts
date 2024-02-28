import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repository: Repository<User>) {}

  async create(dto: UserDto) {
    const existUser = await this.repository.findOne({
      where: { email: dto.email },
    });
    if (existUser) {
      throw new BadRequestException('User with this email already exists');
    }

    const user = await this.repository.save({
      email: dto.email,
      password: await bcrypt.hash(dto.password, 7),
      username: dto.username,
    });
    return user;
  }

  async findById(id: string) {
    return this.repository.findOne({ where: { id } });
  }
  async findByEmail(email: string) {
    return this.repository.findOne({ where: { email } });
  }
}
