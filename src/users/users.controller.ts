import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from './entity/user.entity';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Получение пользователя по идентификатору' })
  @ApiOkResponse({ type: User })
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }
}
