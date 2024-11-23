import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ConsultaService } from './consulta.service';
import { CreateConsultaDto } from './dto/create-consulta.dto';

@Controller('consulta')
export class ConsultaController {
  constructor(private readonly consultaService: ConsultaService) {}

  @Post()
  async createConsulta(@Body() createConsultaDto: CreateConsultaDto) {
    return await this.consultaService.createConsulta(createConsultaDto);
  }

  @Get()
  async getConsultas() {
    return await this.consultaService.getConsultas();
  }

  @Get(':id')
  async getConsultaById(@Param('id') id: string) {
    return await this.consultaService.getConsultaById(id);
  }

  @Put(':id')
  async updateConsulta(
    id: string,
    @Body() updateConsultaDto: CreateConsultaDto,
  ) {
    return await this.consultaService.updateConsulta(id, updateConsultaDto);
  }

  @Delete(':id')
  async deleteConsulta(id: string) {
    return await this.consultaService.deleteConsulta(id);
  }
}
