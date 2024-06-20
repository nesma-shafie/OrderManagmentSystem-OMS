import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UsersService } from './users.service';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import UserIdDto from './DTO/userId.dto';
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly UsersService: UsersService) {}
  @Get(':userId/orders')
  getUserOrders(@Param() UserIdDto: UserIdDto) {
    try {
      return this.UsersService.getUserOrders(UserIdDto);
    } catch (e) {
      return e;
    }
  }
}
