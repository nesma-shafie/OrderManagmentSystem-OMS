import { IsUUID, IsString } from 'class-validator';
export default class ApplyCuponDto {
  @IsUUID()
  orderId: string;
  @IsString()
  coupon: string;
}
