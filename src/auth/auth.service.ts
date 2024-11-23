import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { PacienteService } from 'src/paciente/paciente.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly pacienteService: PacienteService,
    private readonly jwtService: JwtService,
  ) {}

  async loginPaciente(loginDto: LoginDto) {
    //pesquisar se o paciente existe
    const paciente = await this.pacienteService.getPacienteByEmail(
      loginDto.email,
    );

    if (!paciente) {
      return new HttpException(
        'Login ou senha inválidos',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (paciente.senha !== loginDto.senha) {
      return new HttpException(
        'Login ou senha inválidos',
        HttpStatus.BAD_REQUEST,
      );
    }

    const payload = {
      sub: {
        id: paciente.id,
        name: paciente.nome,
        role: 'PACIENTE',
      },
    };

    return {
      token: await this.jwtService.signAsync(payload),
      userId: paciente.id,
      name: paciente.nome,
    };
  }
}
