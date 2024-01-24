import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { TransferDto } from './dto/transfer.dto';
import { TransferData } from './decorator/transfer.decorator';
import { UserService } from './user.service';
import { JwtGuard } from '../auth/guard/jwt.guard';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('transfer')
  transferFunds(
    @TransferData()
    { user, transferData }: { user: User; transferData: TransferDto },
  ) {
    return this.userService.transferFunds(user['sub'], transferData);
  }
}
