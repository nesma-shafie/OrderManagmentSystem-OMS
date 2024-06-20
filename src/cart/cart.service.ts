import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import AddProductDto from './DTO/addProduct.dto';
import getUserCartDto from './DTO/getUserCart.dto';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}
  async getUserCart(getUserCartDto: getUserCartDto) {
    const userCart = await this.prisma.carts.findUnique({
      where: {
        userID: getUserCartDto.userId,
      },
      include: {
        ProductsList: {
          select: {
            product: {
              select: {
                id: true,
                name: true,
                description: true,
                price: true,
              },
            },
            quantity: true,
          },
        },
      },
    });
    return userCart.ProductsList;
  }
  async addToUserCart(AddProductDto: AddProductDto) {
    const requiredProduct = await this.prisma.products.findUnique({
      where: {
        id: AddProductDto.productId,
      },
    });
    if (!requiredProduct) throw new NotFoundException('product not found');
    ////if there is no stock throw exception
    if (requiredProduct.stock === 0)
      throw new NotFoundException('product not available');
    ////get the product from the user cart
    const userCart = await this.prisma.carts.findUnique({
      where: {
        userID: AddProductDto.userId,
      },
      include: {
        ProductsList: {
          where: {
            productId: AddProductDto.productId,
          },
          select: {
            quantity: true,
          },
        },
      },
    });

    if (userCart.ProductsList.length !== 0)
      //if the product already exit in the cart update quantity
      return await this.prisma.cartProduct.update({
        where: {
          cartId_productId: {
            cartId: userCart.id,
            productId: AddProductDto.productId,
          },
        },
        data: {
          quantity: { increment: 1 },
        },
      });
    ////if the product does not exit in the cart add it to th cart
    else
      return await this.prisma.cartProduct.create({
        data: {
          cartId: userCart.id,
          productId: AddProductDto.productId,
        },
      });
  }
  async removeFromUserCart(AddProductDto: AddProductDto) {
    const userCart = await this.prisma.carts.findUnique({
      where: {
        userID: AddProductDto.userId,
      },
      include: {
        ProductsList: {
          where: {
            productId: AddProductDto.productId,
          },
        },
      },
    });
    if (userCart.ProductsList.length === 0)
      throw new NotFoundException('product not found in your cart');
    else
      return await this.prisma.cartProduct.delete({
        where: {
          cartId_productId: {
            cartId: userCart.id,
            productId: AddProductDto.productId,
          },
        },
      });
  }
}
