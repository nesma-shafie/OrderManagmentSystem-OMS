import { IsUUID } from 'class-validator';
export default class CreateOrderDto {
  @IsUUID()
  userId: string;
}
