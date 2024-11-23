import { Injectable } from '@nestjs/common';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { PrismaService } from 'src/repository/prisma.service';
import { UpdatePacienteDto } from './dto/update-paciente.dto';

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
      },
    });
  }

  async findAll() {
    return await this.repository.paciente.findMany();
  }

  async getPacienteById(id: string) {
    return await this.repository.paciente.findUnique({
      where: { id },
    });
  }

  async update(id: string, updatePacienteDto: UpdatePacienteDto) {
    return await this.repository.paciente.update({
      where: { id },
      data: updatePacienteDto,
    });
  }

  async remove(id: string) {
    return await this.repository.paciente.delete({
      where: { id },
    });
  }
}
