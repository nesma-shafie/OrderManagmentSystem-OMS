import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
// initialize the Prisma Client
const prisma = new PrismaClient();

async function main() {
  await prisma.users.deleteMany({});
  await prisma.carts.deleteMany({});
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
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
