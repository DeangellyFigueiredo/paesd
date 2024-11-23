import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/repository/prisma.service';
import { CreateConsultaDto } from './dto/create-consulta.dto';
import { MedicoService } from 'src/medico/medico.service';
import { PacienteService } from 'src/paciente/paciente.service';
import { UpdateConsultaDto } from './dto/update-consulta.dto';

@Injectable()
export class ConsultaService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly medicoService: MedicoService,
    private readonly pacienteService: PacienteService,
  ) {}

  async createConsulta(createConsultaDto: CreateConsultaDto) {
    const medico = await this.medicoService.getMedicoById(
      createConsultaDto.medicoId,
    );
    if (!medico) {
      throw new HttpException('Médico não encontrado', HttpStatus.NOT_FOUND);
    }

    const paciente = await this.pacienteService.getPacienteById(
      createConsultaDto.pacienteId,
    );
    if (!paciente) {
      throw new HttpException('Paciente não encontrado', HttpStatus.NOT_FOUND);
    }
    if (new Date(createConsultaDto.data) < new Date()) {
      throw new HttpException(
        'Data da consulta inválida',
        HttpStatus.BAD_REQUEST,
      );
    }

    const consultasMedico = await this.prismaService.consulta.findMany({
      where: {
        medicoId: createConsultaDto.medicoId,
        data: new Date(createConsultaDto.data),
      },
    });

    if (consultasMedico.length > 0) {
      throw new HttpException(
        'Médico já possui consulta marcada para esse horário',
        HttpStatus.BAD_REQUEST,
      );
    }

    const consultasPaciente = await this.prismaService.consulta.findMany({
      where: {
        pacienteId: createConsultaDto.pacienteId,
        data: new Date(createConsultaDto.data),
      },
    });

    if (consultasPaciente.length > 0) {
      throw new HttpException(
        'Paciente já possui consulta marcada para esse horário',
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.prismaService.consulta.create({
      data: {
        data: new Date(createConsultaDto.data),
        observacoes: createConsultaDto.observacoes,
        medicoId: createConsultaDto.medicoId,
        pacienteId: createConsultaDto.pacienteId,
      },
    });
  }

  async getConsultas() {
    return await this.prismaService.consulta.findMany({
      select: {
        id: true,
        observacoes: true,
        data: true,
        medico: {
          select: {
            nome: true,
            especialidade: true,
          },
        },
        paciente: {
          select: {
            nome: true,
            telefone: true,
            email: true,
          },
        },
      },
    });
  }

  async getConsultaById(id: string) {
    const consulta = await this.prismaService.consulta.findUnique({
      where: { id },
      include: {
        medico: true,
        paciente: true,
      },
    });

    if (!consulta) {
      throw new HttpException('Consulta não encontrada', HttpStatus.NOT_FOUND);
    }

    return consulta;
  }

  async updateConsulta(id: string, data: UpdateConsultaDto) {
    const consultaExists = await this.prismaService.consulta.findUnique({
      where: { id },
    });

    if (!consultaExists) {
      throw new HttpException('Consulta não encontrada', HttpStatus.NOT_FOUND);
    }

    return await this.prismaService.consulta.update({
      where: { id },
      data,
    });
  }

  async deleteConsulta(id: string) {
    const consultaExists = await this.prismaService.consulta.findUnique({
      where: { id },
    });

    if (!consultaExists) {
      throw new HttpException('Consulta não encontrada', HttpStatus.NOT_FOUND);
    }

    return await this.prismaService.consulta.delete({
      where: { id },
    });
  }
}
