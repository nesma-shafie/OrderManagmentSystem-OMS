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
    ////check if all products is available
    for (let i = 0; i < products.length; i++) {
      if (products[i].quantity > products[i].product.stock)
        throw new NotFoundException(
          `required quantity from product ${products[i].product.name} with id ${products[i].product.id} is not available`,
        );
      products[i].product.stock -= products[i].quantity;
    }
    /////reduce the products stock
    await Promise.all(
      products.map((product) =>
        this.prisma.products.update({
          where: { id: product.product.id },
          data: {
            stock: product.product.stock,
          },
        }),
      ),
    );
    ////remove all products from the cart
    await this.prisma.cartProduct.deleteMany({
      where: {
        cartId: userCart.id,
      },
    });
    let totalPrice = 0;
    products.forEach(
      (product) => (totalPrice += product.product.price * product.quantity),
    );
    ////crete the order
    return await this.prisma.orders.create({
      data: {
        usersId: CreateOrderDto.userId,
        totalPrice: totalPrice,
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
        totalPrice: true,
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
        productsList: {
          select: {
            product: true,
            quantity: true,
          },
        },
        status: true,
      },
    });
    if (!order) throw new NotFoundException('order not found');
    if (order.status === 'CANCELLED' || order.status === 'COMPLETED')
      throw new NotFoundException(
        `the order is already ${order.status} you can not change its status`,
      );
    if (status.status === 'CANCELLED') {
      const products = order.productsList;
      await Promise.all(
        products.map((product) =>
          this.prisma.products.update({
            where: { id: product.product.id },
            data: {
              stock: product.product.stock + product.quantity,
            },
          }),
        ),
      );
    }
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
