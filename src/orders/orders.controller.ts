import { Controller, Get, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  @Get(':orderId')
  getOrder() {
    return [];
  }
  @Post()
  createOrder() {
    return [];
  }
  @Post('apply-coupon')
  applyCoupnToOrder() {
    return [];
  }
  @Put(':orderId/status')
  updateOrderStatus() {
    return [];
  }
}
