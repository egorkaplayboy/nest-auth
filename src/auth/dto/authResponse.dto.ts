import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDto {
  @ApiProperty()
  token: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  id: string;

  @ApiProperty()
  createdAt: Date;
}
