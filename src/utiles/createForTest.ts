import { PrismaService } from '../prisma/prisma.service';
import { Users, Carts, Products, Coupons } from '@prisma/client';
const prisma = new PrismaService();

async function initializeDataBase(): Promise<{
  users: Users[];
  products: Products[];
  carts: Carts[];
  coupons: Coupons[];
}> {
  // Create Users

  const user1 = {
    id: '08a93b57-365f-4b97-ab89-06e4d84f700c',
    name: 'nesma',
    email: 'nesmaahmed@gmail.com',
    address: 'giza',
    password: '123456789',
  };
  const user2 = {
    id: '08a93b57-365f-4b97-ab89-06e4d84f711d',
    name: 'salma',
    email: 'salmaahmed@gmail.com',
    address: 'cairo',
    password: '4545444545454',
  };
  // Create Carts
  const cart1 = {
    id: '87ee1cbd-0ed8-4479-a83c-f89b8e524acc',
    userID: user1.id,
  };
  const cart2 = {
    id: '87ee1cbd-0ed8-4479-a83c-f89b8e524add',
    userID: user2.id,
  };
  // Create Products
  const product1 = {
    id: '04ce77f2-88a8-45da-aaa4-7a31776f4701',
    name: 'Product 1',
    description: 'describe Product 1',
    price: 10,
    stock: 0,
  };
  const product2 = {
    id: '04ce77f2-88a8-45da-aaa4-7a31776f4702',
    name: 'Product 2',
    description: 'describe Product 2',
    price: 20,
    stock: 1,
  };
  const product3 = {
    id: '04ce77f2-88a8-45da-aaa4-7a31776f4703',
    name: 'Product 3',
    description: 'describe Product 3',
    price: 15,
    stock: 5,
  };
  const product4 = {
    id: '04ce77f2-88a8-45da-aaa4-7a31776f4704',
    name: 'Product 4',
    description: 'describe Product 4',
    price: 25,
    stock: 20,
  };
  const coupon1 = {
    cupon: '04ce77f2',
    discountPercentage: 10,
    expirationDate: new Date('2028-10-01T00:00:00.000Z'),
  };
  const coupon2 = {
    cupon: '7a31776f',
    discountPercentage: 20,
    expirationDate: new Date('2020-10-01T00:00:00.000Z'),
  };
  await prisma.cartProduct.deleteMany({});
  await prisma.orderProduct.deleteMany({});
  await prisma.orders.deleteMany({});
  await prisma.products.deleteMany({});
  await prisma.carts.deleteMany({});
  await prisma.users.deleteMany({});
  await prisma.coupons.deleteMany({});

  await prisma.users.create({
    data: user1,
  });
  await prisma.users.create({
    data: user2,
  });

  await prisma.carts.create({
    data: cart1,
  });
  await prisma.carts.create({
    data: cart2,
  });

  await prisma.products.create({
    data: product1,
  });
  await prisma.products.create({
    data: product2,
  });
  await prisma.products.create({
    data: product3,
  });
  await prisma.products.create({
    data: product4,
  });
  await prisma.coupons.create({
    data: coupon1,
  });
  await prisma.coupons.create({
    data: coupon2,
  });
  return {
    users: [user1, user2],
    carts: [cart1, cart2],
    coupons: [coupon1, coupon2],
    products: [product1, product2, product3, product4],
  };
}

export const initializeDataBaseService = initializeDataBase;
