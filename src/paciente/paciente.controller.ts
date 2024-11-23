import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { PacienteService } from './paciente.service';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('paciente')
export class PacienteController {
  constructor(private readonly pacienteService: PacienteService) {}

  @Post('')
  create(@Body() createPacienteDto: CreatePacienteDto) {
    return this.pacienteService.create(createPacienteDto);
  }

  @UseGuards(AuthGuard)
  @Get('/paciente')
  findAll() {
    return this.pacienteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pacienteService.getPacienteById(id);
  }

  @Put(':id')
  update(@Param('id') id: string) {
    return this.pacienteService.update(id, {});
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pacienteService.remove(id);
  }
}
