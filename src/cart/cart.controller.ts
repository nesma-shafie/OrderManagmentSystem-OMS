import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('cart')
@Controller('cart')
export class CartController {
  @Get(':userId')
  getUserCart() {
    return [];
  }
  @Post('add')
  addToUserCart() {
    return [];
  }
  @Put('update')
  updateUserCart() {
    return [];
  }
  @Delete('update')
  removeFromUserCart() {
    return [];
  }
}
