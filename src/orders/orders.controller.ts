import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { OrdersService } from './orders.service';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import CreateOrderDto from './DTO/createOrder.dto';
import OrderIdDto from './DTO/orderId.dto';
import UpdateOrderStatusDto from './DTO/updateOrderStatus.dto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ApplyCuponDto from './DTO/applyCupon.dto';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly OrdersService: OrdersService) {}

  @Get(':orderId')
  @ApiOperation({ summary: 'Get order by ID' })
  @ApiParam({ name: 'orderId', description: 'The ID of the order' })
  @ApiResponse({
    status: 200,
    description: 'The order has been successfully retrieved.',
    schema: {
      example: {
        id: 1,
        orderDate: '2021-01-01T00:00:00.000Z',
        status: 'delivered',
        totalPrice: 100,
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
        ],
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Order not found' })
  getOrder(@Param() orderIdDto: OrderIdDto) {
    try {
      return this.OrdersService.getOrder(orderIdDto);
    } catch (e) {
      return e;
    }
  }

  @Post()
  @ApiOperation({ summary: 'Create a new order' })
  @ApiResponse({
    status: 201,
    description: 'The order has been successfully created.',
  })
  @ApiResponse({
    status: 409,
    description:
      'Your cart is empty or the required quantity from product in the cart is not available',
  })
  createOrder(@Body() CreateOrderDto: CreateOrderDto) {
    try {
      return this.OrdersService.createOrder(CreateOrderDto);
    } catch (e) {
      return e;
    }
  }

  @Post('apply-coupon')
  @ApiOperation({ summary: 'Apply a coupon to an order' })
  @ApiResponse({
    status: 200,
    description: 'The coupon has been successfully applied.',
  })
  @ApiResponse({ status: 404, description: 'Coupon or order not found' })
  @ApiResponse({
    status: 400,
    description:
      'The order is completed or cancelled, you cannot apply the coupon',
  })
  applyCoupnToOrder(@Body() ApplyCuponDto: ApplyCuponDto) {
    return this.OrdersService.applyCoupnToOrder(ApplyCuponDto);
  }

  @Put(':orderId/status')
  @ApiOperation({ summary: 'Update the status of an order' })
  @ApiParam({ name: 'orderId', description: 'The ID of the order' })
  @ApiResponse({
    status: 200,
    description: 'The order status has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Order not found' })
  @ApiResponse({
    status: 400,
    description:
      'The order is already cancelled or completed, you cannot change its status',
  })
  updateOrderStatus(
    @Param() orderId: OrderIdDto,
    @Body() status: UpdateOrderStatusDto,
  ) {
    try {
      return this.OrdersService.updateOrderStatus(orderId, status);
    } catch (e) {
      return e;
    }
  }
}
