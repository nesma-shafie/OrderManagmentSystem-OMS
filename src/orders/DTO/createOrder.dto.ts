import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
export default class CreateOrderDto {
  @IsUUID()
  @ApiProperty({ description: 'ID of the user creating the order' })
  userId: string;
}
