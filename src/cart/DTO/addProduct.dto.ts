import { IsUUID } from 'class-validator';
export default class AddProductDto {
  @IsUUID()
  userId: string;
  @IsUUID()
  productId: string;
}
