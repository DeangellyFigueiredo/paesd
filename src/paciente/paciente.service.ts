import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { PrismaService } from 'src/repository/prisma.service';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { Paciente } from '@prisma/client';

@Injectable()
export class PacienteService {
  constructor(private readonly repository: PrismaService) {}

  async create(createPacienteDto: CreatePacienteDto) {
    return await this.repository.paciente.create({
      data: {
        nome: createPacienteDto.nome,
        email: createPacienteDto.email,
        idade: createPacienteDto.idade,
        telefone: createPacienteDto.telefone,
        senha: createPacienteDto.senha,
      },
    });
  }

  async findAll() {
    return await this.repository.paciente.findMany();
  }

  async getPacienteById(id: string) {
    const paciente = await this.repository.paciente.findUnique({
      where: { id },
    });

    if (!paciente) {
      return new HttpException('Paciente não encontrado', HttpStatus.NOT_FOUND);
    }

    return paciente;
  }

  async getPacienteByEmail(email: string): Promise<Paciente> {
    const paciente = await this.repository.paciente.findFirst({
      where: {
        email: email,
      },
    });

    return paciente;
  }
  async update(id: string, updatePacienteDto: UpdatePacienteDto) {
    const pacienteExists = await this.repository.paciente.findUnique({
      where: { id },
    });

    if (!pacienteExists) {
      return new HttpException('Paciente não encontrado', HttpStatus.NOT_FOUND);
    }

    return await this.repository.paciente.update({
      where: { id },
      data: updatePacienteDto,
    });
  }

  async remove(id: string) {
    const pacienteExists = await this.repository.paciente.findUnique({
      where: { id },
    });

    if (!pacienteExists) {
      return new HttpException('Paciente não encontrado', HttpStatus.NOT_FOUND);
    }

    return await this.repository.paciente.delete({
      where: { id },
    });
  }
}
