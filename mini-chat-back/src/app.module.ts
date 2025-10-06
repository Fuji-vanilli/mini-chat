import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma/prisma.service';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UserModule, 
    AuthModule
  ],
  controllers: [AuthController],
  providers: [
    PrismaService, 
    AuthService
  ],
})
export class AppModule {}
