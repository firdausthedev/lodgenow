import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

async function seed() {
  const seedFilesPath = path.join(__dirname);

  const seedFiles = fs
    .readdirSync(seedFilesPath)
    .filter(file => file.endsWith("Seed.ts"));

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
