import { IsNumber, IsNotEmpty } from 'class-validator';

export class TransferDto {
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsNumber()
  @IsNotEmpty()
  accountIdSender: number;

  @IsNumber()
  @IsNotEmpty()
  accountIdReceiver: number;
}
