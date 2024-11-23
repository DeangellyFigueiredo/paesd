import { Injectable } from '@nestjs/common';
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
    return await this.repository.medico.findUnique({
      where: { id },
      include: {
        Consulta: true,
      },
    });
  }

  async updateMedico(id: string, updateMedicoDto: UpdateMedicoDto) {
    return await this.repository.medico.update({
      where: { id },
      data: updateMedicoDto,
    });
  }

  async deleteMedico(id: string) {
    return await this.repository.medico.delete({
      where: { id },
    });
  }
}
