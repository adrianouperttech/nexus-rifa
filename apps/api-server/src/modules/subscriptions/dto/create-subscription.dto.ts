import { IsString, IsNotEmpty } from 'class-validator';

export class CreateSubscriptionDto {
  @IsString()
  @IsNotEmpty()
  tenant_id: string;

  @IsString()
  @IsNotEmpty()
  plan_id: string;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsString()
  @IsNotEmpty()
  payment_gateway_subscription_id: string;
}
