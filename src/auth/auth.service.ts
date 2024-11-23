import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { PacienteService } from 'src/paciente/paciente.service';

@Injectable()
export class AuthService {
  constructor(private readonly pacienteService: PacienteService) {}

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

    return {
      token: 'TOKEN JWT',
      userId: paciente.id,
      name: paciente.nome,
    };
  }
}
