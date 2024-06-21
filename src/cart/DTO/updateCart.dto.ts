import { IsUUID, IsEnum } from 'class-validator';
import { UpdateQuantity } from '../updateQuantity.enum';
import { ApiProperty } from '@nestjs/swagger';
export default class UpdateCartDto {
  @IsUUID()
  @ApiProperty({ description: 'ID of the user' })
  userId: string;
  @IsUUID()
  @ApiProperty({ description: 'ID of the product' })
  productId: string;
  @IsEnum(UpdateQuantity)
  @ApiProperty({ description: 'Update type: Increase or Decrease' })
  update: string;
}
