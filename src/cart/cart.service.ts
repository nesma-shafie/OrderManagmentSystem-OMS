import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import AddProductDto from './DTO/addProduct.dto';
import getUserCartDto from './DTO/getUserCart.dto';
import UpdateCartDto from './DTO/updateCart.dto';
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
      throw new ConflictException('product not available');
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
      throw new ConflictException('product not found in your cart');
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

  async updateUserCart(UpdateCartDto: UpdateCartDto) {
    const requiredProduct = await this.prisma.products.findUnique({
      where: {
        id: UpdateCartDto.productId,
      },
    });
    if (!requiredProduct) throw new NotFoundException('product not found');
    ////get the product from the user cart
    const userCart = await this.prisma.carts.findUnique({
      where: {
        userID: UpdateCartDto.userId,
      },
      include: {
        ProductsList: {
          where: {
            productId: UpdateCartDto.productId,
          },
          select: {
            quantity: true,
          },
        },
      },
    });
    if (userCart.ProductsList.length === 0)
      throw new ConflictException(
        'the product is not found in yous cart add it first',
      );
    if (UpdateCartDto.update === 'Increase')
      return await this.prisma.cartProduct.update({
        where: {
          cartId_productId: {
            cartId: userCart.id,
            productId: UpdateCartDto.productId,
          },
        },
        data: {
          quantity: { increment: 1 },
        },
      });
    else if (UpdateCartDto.update === 'Decrease') {
      const updated = await this.prisma.cartProduct.update({
        where: {
          cartId_productId: {
            cartId: userCart.id,
            productId: UpdateCartDto.productId,
          },
        },
        data: {
          quantity: { decrement: 1 },
        },
      });
      if (updated.quantity === 0)
        await this.prisma.cartProduct.delete({
          where: {
            cartId_productId: {
              cartId: userCart.id,
              productId: UpdateCartDto.productId,
            },
          },
        });
      return updated;
    }
  }
}
