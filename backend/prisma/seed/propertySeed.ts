import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  await prisma.property.createMany({
    data: [
      {
        id: "1b23fb9c-22a2-461b-af72-c72a7a67b21d",
        name: "Studio Unit",
        bathrooms: 2,
        bedrooms: 4,
        location: "Quahog, Rhode Island",
        type: "CITY",
        price: 250.0,
        photos: [
          "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
          "https://images.unsplash.com/photo-1531835551805-16d864c8d311",
          "https://images.unsplash.com/photo-1585128792103-0b591f96512e",
        ],
        agentId: "6b23fb9c-22a2-461b-af72-c72a7a67b21d",
      },
      {
        id: "b9d6ba46-a907-4dea-a503-b93153046099",
        name: "Apartment Unit With City View",
        bathrooms: 2,
        bedrooms: 3,
        location: "Manhattan, New York",
        type: "CITY",
        price: 300.0,
        photos: [
          "https://images.unsplash.com/photo-1531835551805-16d864c8d311",
          "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
          "https://images.unsplash.com/photo-1585128792103-0b591f96512e",
        ],
        agentId: "adf2939b-8283-4694-9621-93b141f07a23",
      },
      {
        id: "d9d6ba46-a907-4dea-a503-b93153046099",
        name: "Condo Unit",
        bathrooms: 3,
        bedrooms: 5,
        location: "Scranton, Pennsylvania",
        type: "CITY",
        price: 350.0,
        photos: [
          "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
          "https://images.unsplash.com/photo-1531835551805-16d864c8d311",
          "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
        ],
        agentId: "c9d6ba46-a907-4dea-a503-b93153046099",
      },
      {
        id: "bdf2939b-8283-4694-9621-93b141f07a23",
        name: "Cabin Unit",
        bathrooms: 2,
        bedrooms: 3,
        location: "Coquihalla Canyon Provincial Park, Canada",
        type: "MOUNTAIN",
        price: 400.0,
        photos: [
          "https://images.unsplash.com/photo-1587061949409-02df41d5e562",
          "https://images.unsplash.com/photo-1531835551805-16d864c8d311",
          "https://images.unsplash.com/photo-1585128792103-0b591f96512e",
        ],
        agentId: "d6d53280-bb84-4e6f-838b-b9e1d4b13d26",
      },
      {
        id: "af2f0c0f-750d-460e-bb7e-4ebec8135380",
        name: "Villa Unit With Lake View",
        bathrooms: 5,
        bedrooms: 10,
        location: "Vancouver, Canada",
        type: "MOUNTAIN",
        price: 1000.0,
        photos: [
          "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
          "https://images.unsplash.com/photo-1585128792103-0b591f96512e",
        ],
        agentId: "ff2f0c0f-750d-460e-bb7e-4ebec8135380",
      },
      {
        id: "2f2f0c0f-750d-460e-bb7e-4ebec8135380",
        name: "House Unit",
        bathrooms: 2,
        bedrooms: 3,
        location: "Vancouver, Canada",
        type: "RURAL",
        price: 100.0,
        photos: [
          "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14a",
          "https://images.unsplash.com/photo-1585128792103-0b591f96512e",
        ],
        agentId: "ff2f0c0f-750d-460e-bb7e-4ebec8135380",
      },
      {
        id: "hf2f0c0f-750d-460e-bb7e-4ebec8135380",
        name: "Beach Unit",
        bathrooms: 1,
        bedrooms: 1,
        location: "Malahini , Maldives",
        type: "TROPICAL",
        price: 160.0,
        photos: [
          "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2",
          "https://images.unsplash.com/photo-1585128792103-0b591f96512e",
        ],
        agentId: "ff2f0c0f-750d-460e-bb7e-4ebec8135380",
      },
    ],
  });
};

main()
  .catch(error => {
    throw error;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
