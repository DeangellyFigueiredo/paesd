import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login/paciente')
  async loginPaciente(@Body() loginDto: LoginDto) {
    return await this.authService.loginPaciente(loginDto);
  }
}
