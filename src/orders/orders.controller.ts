import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { OrdersService } from './orders.service';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import CreateOrderDto from './DTO/createOrder.dto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import orderIdDto from './DTO/orderId.dto';
import updateOrderStatusDto from './DTO/updateOrderStatus.dto';
@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly OrdersService: OrdersService) {}
  @Get(':orderId')
  getOrder(@Param() orderIdDto: orderIdDto) {
    try {
      return this.OrdersService.getOrder(orderIdDto);
    } catch (e) {
      return e;
    }
  }
  @Post()
  createOrder(@Body() CreateOrderDto: CreateOrderDto) {
    try {
      return this.OrdersService.createOrder(CreateOrderDto);
    } catch (e) {
      return e;
    }
  }
  @Post('apply-coupon')
  applyCoupnToOrder() {
    return [];
  }
  @Put(':orderId/status')
  updateOrderStatus(
    @Param() orderId: orderIdDto,
    @Body() status: updateOrderStatusDto,
  ) {
    try {
      return this.OrdersService.updateOrderStatus(orderId, status);
    } catch (e) {
      return e;
    }
  }
}
