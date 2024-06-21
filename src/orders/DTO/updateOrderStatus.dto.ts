import { IsEnum } from 'class-validator';
import { OrderStatus } from '../order-status.enum';
import { ApiProperty } from '@nestjs/swagger';
export default class updateOrderStatusDto {
  @IsEnum(OrderStatus)
  @ApiProperty({ description: 'New status of the order', example: 'COMPLETED' })
  status: OrderStatus;
}
