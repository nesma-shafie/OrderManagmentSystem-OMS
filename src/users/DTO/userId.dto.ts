import { IsUUID } from 'class-validator';
export default class UserIdDto {
  @IsUUID()
  userId: string;
}
