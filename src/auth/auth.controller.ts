import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Request, Response } from 'express';
import { UsersService } from 'src/users/users.service';
import { UserDto } from 'src/users/dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private userService: UsersService,
  ) {}
  @Post('register')
  async register(
    @Body() dto: UserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.userService.create(dto);
    const token = await this.authService.addTokenToResponse(user.id, res);
    return { ...user, token };
  }
  @Post('login')
  async login(@Body() dto: AuthDto, @Res({ passthrough: true }) res: Response) {
    const user = await this.authService.validateUser(dto.email, dto.password);
    const token = await this.authService.addTokenToResponse(user.id, res);
    return { ...user, token };
  }
  @Get('profile')
  async getUser(@Req() req: Request) {
    return await this.authService.getUser(req);
  }
}
