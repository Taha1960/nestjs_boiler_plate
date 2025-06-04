import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { LoginDto } from '../user/dto/create-user.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  @ApiConsumes('application/x-www-form-urlencoded')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

}
