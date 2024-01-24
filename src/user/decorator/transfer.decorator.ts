// transfer.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@prisma/client';
import { TransferDto } from '../dto/transfer.dto';

export const TransferData = createParamDecorator(
  (
    data: unknown,
    ctx: ExecutionContext,
  ): { user: User; transferData: TransferDto } => {
    const request = ctx.switchToHttp().getRequest();

    // Extract user details from the request
    const user: User = request.user;

    // Extract transfer data from the request body
    const transferData: TransferDto = request.body;

    return {
      user,
      transferData,
    };
  },
);
