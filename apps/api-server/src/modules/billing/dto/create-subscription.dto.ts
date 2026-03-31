export class CreateSubscriptionDto {
  tenant_id: string;
  payer_email: string;
  reason: string;
  price: number;
}
