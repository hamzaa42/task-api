// user.service.ts
import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TransferDto } from './dto/transfer.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async transferFunds(
    userId: number,
    transferData: TransferDto,
  ): Promise<boolean> {
    const { amount, accountIdSender, accountIdReceiver } = transferData;

    // Check if the user owns the sender account
    const isSenderAccountOwner = await this.prisma.account.findFirst({
      where: { AccountID: accountIdSender, UserID: userId },
    });

    if (!isSenderAccountOwner) {
      throw new ForbiddenException('User does not own the sender account.');
    }

    // Fetch the sender's account
    const senderAccount = await this.prisma.account.findUnique({
      where: { AccountID: accountIdSender },
    });

    // Fetch the receiver's account
    const receiverAccount = await this.prisma.account.findUnique({
      where: { AccountID: accountIdReceiver },
    });

    // Check if the sender has enough balance
    if (senderAccount.Balance < amount) {
      throw new ForbiddenException('Insufficient funds for the transfer.');
    }

    // Create a transaction for the sender
    await this.prisma.transaction.create({
      data: {
        Amount: -amount, // Negative amount for the sender
        TransactionType: 'TRANSFER',
        AccountID: accountIdSender,
      },
    });

    // Create a transaction for the receiver
    await this.prisma.transaction.create({
      data: {
        Amount: amount, // Positive amount for the receiver
        TransactionType: 'TRANSFER',
        AccountID: accountIdReceiver,
      },
    });

    // Update account balances
    await this.prisma.account.update({
      where: { AccountID: accountIdSender },
      data: { Balance: senderAccount.Balance - amount },
    });

    await this.prisma.account.update({
      where: { AccountID: accountIdReceiver },
      data: { Balance: receiverAccount.Balance + amount },
    });

    return true;
  }
}
