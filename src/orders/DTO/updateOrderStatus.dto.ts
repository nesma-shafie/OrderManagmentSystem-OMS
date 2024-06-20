import { IsEnum } from 'class-validator';
import { OrderStatus } from '../order-status.enum';
export default class updateOrderStatusDto {
  @IsEnum(OrderStatus)
  status: OrderStatus;
}
