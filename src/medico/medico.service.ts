import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/repository/prisma.service';
import { CreateMedicoDto } from './dto/create-medico.dto';
import { UpdateMedicoDto } from './dto/update-medico.dto';

@Injectable()
export class MedicoService {
  constructor(private readonly repository: PrismaService) {}

  async createMedico(createMedicoDto: CreateMedicoDto) {
    return await this.repository.medico.create({
      data: {
        nome: createMedicoDto.nome,
        email: createMedicoDto.email,
        especialidade: createMedicoDto.especialidade,
        telefone: createMedicoDto.telefone,
      },
    });
  }

  async getMedicos() {
    return await this.repository.medico.findMany();
  }

  async getMedicoById(id: string) {
    const medico = await this.repository.medico.findUnique({
      where: { id },
      include: {
        Consulta: true,
      },
    });

    if (!medico) {
      return new HttpException('Médico não encontrado', HttpStatus.NOT_FOUND);
    }

    return medico;
  }

  async updateMedico(id: string, updateMedicoDto: UpdateMedicoDto) {
    const medicoExists = await this.repository.medico.findUnique({
      where: { id },
    });

    if (!medicoExists) {
      return new HttpException('Médico não encontrado', HttpStatus.NOT_FOUND);
    }

    return await this.repository.medico.update({
      where: { id },
      data: updateMedicoDto,
    });
  }

  async deleteMedico(id: string) {
    const medicoExists = await this.repository.medico.findUnique({
      where: { id },
    });

    if (!medicoExists) {
      return new HttpException('Médico não encontrado', HttpStatus.NOT_FOUND);
    }

    return await this.repository.medico.delete({
      where: { id },
    });
  }
}
