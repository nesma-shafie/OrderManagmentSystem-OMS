import { IsUUID, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export default class ApplyCuponDto {
  @IsUUID()
  @ApiProperty({ description: 'ID of the order' })
  orderId: string;

  @IsString()
  @ApiProperty({ description: 'Coupon code to apply' })
  coupon: string;
}
