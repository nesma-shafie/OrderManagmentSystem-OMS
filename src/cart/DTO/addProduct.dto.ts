import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
export default class AddProductDto {
  @IsUUID()
  @ApiProperty({ description: 'ID of the user' })
  userId: string;
  @IsUUID()
  @ApiProperty({ description: 'ID of the product' })
  productId: string;
}
