import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
export default class UserIdDto {
  @IsUUID()
  @ApiProperty({ description: 'The ID of the user' })
  userId: string;
}
