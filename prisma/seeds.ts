import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
// initialize the Prisma Client
const prisma = new PrismaClient();

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function main() {
  await prisma.cartProduct.deleteMany({});
  await prisma.orderProduct.deleteMany({});
  await prisma.orders.deleteMany({});
  await prisma.products.deleteMany({});
  await prisma.carts.deleteMany({});
  await prisma.users.deleteMany({});
  await prisma.coupons.deleteMany({});
  // eslint-disable-next-line prefer-const
  let usersID = [];
  let id;
  // Generate 10 random users
  for (let i = 0; i < 10; i++) {
    id = faker.string.uuid();
    await prisma.users.create({
      data: {
        id: id,
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        address: faker.location.streetAddress(),
      },
    });
    usersID.push(id);
  }

  // Generate 10 carts
  for (let i = 0; i < 10; i++) {
    await prisma.carts.create({
      data: {
        id: faker.string.uuid(),
        userID: usersID[i],
      },
    });
  }
  // Insert products into database
  const products = Array.from({ length: 20 }, () => ({
    name: faker.commerce.productName(),
    description: faker.lorem.sentence(),
    price: getRandomInt(20, 1000), // Generate random price
    stock: getRandomInt(20, 1000), // Generate random stock
  }));

  await prisma.products.createMany({
    data: products,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
