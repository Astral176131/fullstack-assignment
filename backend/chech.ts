import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function checkUser() {
  const user = await prisma.user.findUnique({
    where: { email: "khanna.aryan133@gmail.com" }
  });
  console.log("User:", user);
}

checkUser();