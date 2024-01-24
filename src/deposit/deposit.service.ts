import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DepositDto } from './dto';

@Injectable()
export class DepositService {
  constructor(private readonly prisma: PrismaService) {}

  async createDeposit(depositDto: DepositDto): Promise<Boolean> {
    const { AccountID, Value } = depositDto;

    // Check if the account exists
    const account = await this.prisma.account.findFirst({
      where: { AccountID: AccountID },
    });
    if (!account) {
      throw new Error(`Account with ID ${AccountID} not found.`);
    }

    // Create a deposit transaction
    console.log(Value);
    const deposit = await this.prisma.transaction.create({
      data: {
        Amount: Value,
        TransactionType: 'DEPOSIT',
        account: {
          connect: { AccountID: AccountID },
        },
      },
    });

    // Update the account balance
    const updatedAccount = await this.prisma.account.update({
      where: { AccountID: account.AccountID },
      data: { Balance: account.Balance + Value },
    });

    return true;
  }
}
