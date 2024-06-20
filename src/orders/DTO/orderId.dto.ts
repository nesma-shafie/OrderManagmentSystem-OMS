import { IsUUID } from 'class-validator';
export default class orderIdDto {
  @IsUUID()
  orderId: string;
}
