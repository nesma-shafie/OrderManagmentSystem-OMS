import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UsersService } from './users.service';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import UserIdDto from './DTO/userId.dto';
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly UsersService: UsersService) {}
  @Get(':userId/orders')
  @ApiOperation({ summary: 'Get user orders by user ID' })
  @ApiParam({ name: 'userId', description: 'The ID of the user' })
  @ApiResponse({
    status: 200,
    description: 'The user orders have been successfully retrieved.',
    schema: {
      example: [
        {
          id: 1,
          orderDate: '2021-01-01T00:00:00.000Z',
          status: 'PENDING',
          totalPrice: 500,
          Users: {
            name: 'John Doe',
          },
          productsList: [
            {
              product: {
                name: 'Product 1',
                description: 'Description of product 1',
                price: 50,
              },
              quantity: 2,
            },
            {
              product: {
                name: 'Product 2',
                description: 'Description of product 2',
                price: 80,
              },
              quantity: 5,
            },
          ],
        },
      ],
    },
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  getUserOrders(@Param() UserIdDto: UserIdDto) {
    try {
      return this.UsersService.getUserOrders(UserIdDto);
    } catch (e) {
      return e;
    }
  }
}
