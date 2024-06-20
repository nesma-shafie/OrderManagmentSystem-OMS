import { IsUUID } from 'class-validator';
export default class getUserCartDto {
  @IsUUID()
  userId: string;
}
