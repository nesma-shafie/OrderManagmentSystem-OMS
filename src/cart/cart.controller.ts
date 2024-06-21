import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CartService } from './cart.service';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import AddProductDto from './DTO/addProduct.dto';
import GetUserCartDto from './DTO/getUserCart.dto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import UpdateCartDto from './DTO/updateCart.dto';

@ApiTags('cart')
@Controller('cart')
export class CartController {
  constructor(private readonly CartService: CartService) {}

  @Get(':userId')
  @ApiOperation({ summary: 'Get user cart by user ID' })
  @ApiParam({ name: 'userId', description: 'The ID of the user' })
  @ApiResponse({
    status: 200,
    description: 'The user cart has been successfully retrieved.',
    schema: {
      example: [
        {
          product: {
            id: '1',
            name: 'Product 1',
            description: 'Description of product 1',
            price: 50,
          },
          quantity: 2,
        },
      ],
    },
  })
  getUserCart(@Param() getUserCartDto: GetUserCartDto) {
    return this.CartService.getUserCart(getUserCartDto);
  }

  @Post('add')
  @ApiOperation({ summary: 'Add a product to the user cart' })
  @ApiResponse({
    status: 201,
    description: 'The product has been successfully added to the cart.',
  })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @ApiResponse({ status: 409, description: 'Product not available or product is already added in your cart' })
  addToUserCart(@Body() AddProductDto: AddProductDto) {
    try {
      return this.CartService.addToUserCart(AddProductDto);
    } catch (e) {
      return e;
    }
  }

  @Put('update')
  @ApiOperation({
    summary: 'Update the quantity of a product in the user cart(+1 or -1)',
  })
  @ApiResponse({
    status: 200,
    description: 'The product quantity has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Product not found ' })
  @ApiResponse({
    status: 409,
    description: 'the product is not found in yous cart add it first ',
  })
  updateUserCart(@Body() UpdateCartDto: UpdateCartDto) {
    try {
      return this.CartService.updateUserCart(UpdateCartDto);
    } catch (e) {
      return e;
    }
  }

  @Delete('remove')
  @ApiOperation({ summary: 'Remove a product from the user cart' })
  @ApiResponse({
    status: 200,
    description: 'The product has been successfully removed from the cart.',
  })
  @ApiResponse({ status: 409, description: 'Product not found in the cart' })
  removeFromUserCart(@Body() AddProductDto: AddProductDto) {
    try {
      return this.CartService.removeFromUserCart(AddProductDto);
    } catch (e) {
      return e;
    }
  }
}
