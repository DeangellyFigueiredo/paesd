import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { MedicoService } from './medico.service';
import { CreateMedicoDto } from './dto/create-medico.dto';

@Controller('medico')
export class MedicoController {
  constructor(private readonly medicoService: MedicoService) {}

  @Post()
  async createMedico(@Body() createMedicoDto: CreateMedicoDto) {
    return await this.medicoService.createMedico(createMedicoDto);
  }

  @Get()
  async getMedicos() {
    return await this.medicoService.getMedicos();
  }

  @Get(':id')
  async getMedicoById(id: string) {
    return await this.medicoService.getMedicoById(id);
  }

  @Put(':id')
  async updateMedico(id: string, @Body() updateMedicoDto: CreateMedicoDto) {
    return await this.medicoService.updateMedico(id, updateMedicoDto);
  }

  @Delete(':id')
  async deleteMedico(id: string) {
    return await this.medicoService.deleteMedico(id);
  }
}
