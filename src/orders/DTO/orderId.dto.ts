import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export default class orderIdDto {
  @IsUUID()
  @ApiProperty({ description: 'ID of the order' })
  orderId: string;
}
