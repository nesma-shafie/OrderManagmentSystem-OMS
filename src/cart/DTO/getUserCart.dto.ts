import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
export default class getUserCartDto {
  @IsUUID()
  @ApiProperty({ description: 'ID of the user' })
  userId: string;
}
