import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import CreateOrderDto from './DTO/createOrder.dto';
import orderIdDto from './DTO/orderId.dto';
import updateOrderStatusDto from './DTO/updateOrderStatus.dto';
@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async createOrder(CreateOrderDto: CreateOrderDto) {
    const userCart = await this.prisma.carts.findUnique({
      where: {
        userID: CreateOrderDto.userId,
      },
      include: {
        ProductsList: {
          select: {
            product: true,
            quantity: true,
          },
        },
      },
    });
    if (userCart.ProductsList.length === 0)
      throw new NotFoundException('your cart is empty');
    const products = userCart.ProductsList;
    ////remove all products from the cart
    await this.prisma.cartProduct.deleteMany({
      where: {
        cartId: userCart.id,
      },
    });
    ////crete the order
    return await this.prisma.orders.create({
      data: {
        usersId: CreateOrderDto.userId,
        productsList: {
          create: products.map((cartProduct) => ({
            product: { connect: { id: cartProduct.product.id } },
            quantity: cartProduct.quantity,
          })),
        },
      },
    });
  }

  async getOrder(orderIdDto: orderIdDto) {
    const order = await this.prisma.orders.findUnique({
      where: {
        id: orderIdDto.orderId,
      },
      select: {
        id: true,
        orderDate: true,
        status: true,
        Users: {
          select: {
            name: true,
          },
        },
        productsList: {
          select: {
            product: {
              select: {
                name: true, // Adjust according to the fields you need
                description: true,
                price: true,
              },
            },
            quantity: true,
          },
        },
      },
    });
    if (!order) throw new NotFoundException('order not found');
    else return order;
  }

  async updateOrderStatus(orderId: orderIdDto, status: updateOrderStatusDto) {
    const order = await this.prisma.orders.findUnique({
      where: {
        id: orderId.orderId,
      },
      select: {
        status: true,
      },
    });
    if (!order) throw new NotFoundException('order not found');
    if (order.status === 'CANCELLED' || order.status === 'COMPLETED')
      throw new NotFoundException(
        `the order is already ${order.status} you can not change its status`,
      );
    return await this.prisma.orders.update({
      where: {
        id: orderId.orderId,
      },
      data: {
        status: status.status,
      },
      select: {
        id: true,
        status: true,
      },
    });
  }
}
