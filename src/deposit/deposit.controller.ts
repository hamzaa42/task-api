import { Controller, Post, Body } from '@nestjs/common';
import { DepositService } from './deposit.service';
import { DepositDto } from './dto';

@Controller('deposit')
export class DepositController {
  constructor(private readonly depositService: DepositService) {}

  @Post('create')
  async createDeposit(@Body() depositDto: DepositDto): Promise<Boolean> {
    return this.depositService.createDeposit(depositDto);
  }
}
