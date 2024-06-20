import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import UserIdDto from './DTO/userId.dto';
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async getUserOrders(UserIdDto: UserIdDto) {
    const orders = await this.prisma.orders.findMany({
      where: {
        usersId: UserIdDto.userId,
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
    return orders;
  }
}
