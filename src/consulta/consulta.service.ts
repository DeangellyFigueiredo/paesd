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

    if (createConsultaDto.data < new Date()) {
      throw new HttpException(
        'Data da consulta inválida',
        HttpStatus.BAD_REQUEST,
      );
    }

    const consultas = await this.prismaService.consulta.findMany({
      where: {
        medicoId: createConsultaDto.medicoId,
        data: new Date(createConsultaDto.data),
      },
    });

    if (consultas.length > 0) {
      throw new HttpException(
        'Médico já possui consulta marcada para esse horário',
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
      include: {
        medico: true,
        paciente: true,
      },
    });
  }

  async getConsultaById(id: string) {
    return await this.prismaService.consulta.findUnique({
      where: { id },
      include: {
        medico: true,
        paciente: true,
      },
    });
  }

  async updateConsulta(id: string, data: UpdateConsultaDto) {
    return await this.prismaService.consulta.update({
      where: { id },
      data,
    });
  }

  async deleteConsulta(id: string) {
    return await this.prismaService.consulta.delete({
      where: { id },
    });
  }
}
