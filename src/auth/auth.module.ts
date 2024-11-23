import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PacienteModule } from 'src/paciente/paciente.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [PacienteModule],
})
export class AuthModule {}
