import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Request, Response } from 'express';
import { UsersService } from 'src/users/users.service';
import { UserDto } from 'src/users/dto/user.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthResponseDto } from './dto/authResponse.dto';
import { getUserResponseDto } from './dto/getUserResponse.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private userService: UsersService,
  ) {}
  @ApiOperation({ summary: 'Регистрация' })
  @ApiOkResponse({ type: AuthResponseDto })
  @Post('register')
  async register(
    @Body() dto: UserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.userService.create(dto);
    const token = await this.authService.addTokenToResponse(user.id, res);
    return { ...user, token };
  }
  @ApiOperation({ summary: 'Авторизация' })
  @ApiOkResponse({ type: AuthResponseDto })
  @Post('login')
  async login(@Body() dto: AuthDto, @Res({ passthrough: true }) res: Response) {
    const user = await this.authService.validateUser(dto.email, dto.password);
    const token = await this.authService.addTokenToResponse(user.id, res);
    return { ...user, token };
  }
  @ApiOperation({ summary: 'Получение профиля текущего пользователя' })
  @ApiOkResponse({ type: getUserResponseDto })
  @Get('profile')
  async getUser(@Req() req: Request) {
    return await this.authService.getUser(req);
  }
  @ApiOperation({ summary: 'Выход из аккаунта' })
  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    return this.authService.removeTokenFromResponse(res);
  }
}
