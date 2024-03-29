import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { DepositModule } from './deposit/deposit.module';

@Module({
  imports: [UserModule, AuthModule, PrismaModule, DepositModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
