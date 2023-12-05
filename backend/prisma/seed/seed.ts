import { PrismaClient } from "@prisma/client";
import path from "path";

const prisma = new PrismaClient();

async function seed() {
  const seedFilesPath = path.join(__dirname);

  // This makes sure that the seed files are executed in order
  const seedFiles = [
    "agentSeed.ts",
    "propertySeed.ts",
    "userSeed.ts",
    "reviewSeed.ts",
    "bookingSeed.ts",
    "paymentSeed.ts",
    "adminSeed.ts",
  ];

  for (const seedFile of seedFiles) {
    const seedFilePath = path.join(seedFilesPath, seedFile);
    const { default: seedFunction } = await import(seedFilePath);
    await seedFunction(prisma);
  }

  console.log("Seeding completed successfully");
}

seed()
  .catch(error => {
    console.error("Seeding error:", error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
