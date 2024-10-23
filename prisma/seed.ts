const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.investment.createMany({
    data: [
      {
        "id": 1,
        "name": "Stock A",
        "quantity": 10,
        "buyPrice": 150,
        "currentPrice": 175,
      },
      {
        "id": 2,
        "name": "Stock B",
        "quantity": 5,
        "buyPrice": 200,
        "currentPrice": 190
      },
      {
        "id": 3,
        "name": "Mutual Fund",
        "quantity": 100,
        "buyPrice": 15,
        "currentPrice": 16
      }
    ]
  });

  await prisma.user.createMany({
    data: [
      {
        name: 'John Doe',
        email: 'test4@test.com',
        password: '123'
      },
      {
        name: 'John Kowalski',
        email: 'test15@test.com',
        password: '123'
      },
    ]
  });

  console.log('Users and data inserted.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });