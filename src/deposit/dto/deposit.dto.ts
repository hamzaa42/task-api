import { IsNotEmpty, IsNumber } from 'class-validator';

export class DepositDto {
  @IsNotEmpty()
  @IsNumber()
  AccountID: number;

  @IsNumber()
  @IsNotEmpty()
  Value: number;
}
