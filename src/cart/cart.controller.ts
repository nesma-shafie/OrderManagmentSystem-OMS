import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CartService } from './cart.service';
import { ApiTags } from '@nestjs/swagger';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import AddProductDto from './DTO/addProduct.dto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import getUserCartDto from './DTO/getUserCart.dto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import UpdateCartDto from './DTO/updateCart.dto';
@ApiTags('cart')
@Controller('cart')
export class CartController {
  constructor(private readonly CartService: CartService) {}
  @Get(':userId')
  getUserCart(@Param() getUserCartDto: getUserCartDto) {
    return this.CartService.getUserCart(getUserCartDto);
  }
  @Post('add')
  addToUserCart(@Body() AddProductDto: AddProductDto) {
    try {
      return this.CartService.addToUserCart(AddProductDto);
    } catch (e) {
      return e;
    }
  }
  @Put('update')
  updateUserCart(@Body() UpdateCartDto: UpdateCartDto) {
    try {
      return this.CartService.updateUserCart(UpdateCartDto);
    } catch (e) {
      return e;
    }
  }
  @Delete('remove')
  removeFromUserCart(@Body() AddProductDto: AddProductDto) {
    try {
      return this.CartService.removeFromUserCart(AddProductDto);
    } catch (e) {
      return e;
    }
  }
}
