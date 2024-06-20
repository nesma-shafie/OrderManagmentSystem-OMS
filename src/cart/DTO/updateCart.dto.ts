import { IsUUID, IsEnum } from 'class-validator';
import { UpdateQuantity } from '../updateQuantity.enum';
export default class UpdateCartDto {
  @IsUUID()
  userId: string;
  @IsUUID()
  productId: string;
  @IsEnum(UpdateQuantity)
  update: string;
}
