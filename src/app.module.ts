import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PacienteModule } from './paciente/paciente.module';
import { MedicoModule } from './medico/medico.module';
import { ConsultaModule } from './consulta/consulta.module';
import { RepositoryModule } from './repository/repository.module';

@Module({
  imports: [PacienteModule, MedicoModule, ConsultaModule, RepositoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
