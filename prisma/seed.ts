import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clear existing
  await prisma.review.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.service.deleteMany();
  await prisma.trainer.deleteMany();

  // Create Services
  const services = [
    {
      name: "Weight Loss Yoga",
      description: "A high-intensity yoga session designed to burn calories and build core strength.",
      duration: 60,
      price: 1500,
    },
    {
      name: "Prenatal Yoga",
      description: "Safe and gentle yoga for expectant mothers to prepare the body for childbirth.",
      duration: 45,
      price: 1800,
    },
    {
      name: "Corporate Yoga",
      description: "Office-friendly yoga to relieve desk stress and improve posture.",
      duration: 30,
      price: 2000,
    },
    {
      name: "Meditation & Mindfulness",
      description: "Deep relaxation and guided meditation techniques.",
      duration: 45,
      price: 1200,
    },
    {
      name: "Senior Citizen Yoga",
      description: "Gentle stretches and mobility work adapted for older adults.",
      duration: 45,
      price: 1500,
    },
  ];

  for (const s of services) {
    await prisma.service.create({ data: s });
  }

  // Create Trainers
  const trainers = [
    {
      name: "Anjali Sharma",
      experience: "8 years",
      specialization: "Hatha & Ashtanga Yoga",
      rating: 4.9,
      bio: "Anjali is a certified Ashtanga teacher who focuses on alignment and breath control.",
    },
    {
      name: "Rahul Verma",
      experience: "5 years",
      specialization: "Weight Loss & Power Yoga",
      rating: 4.8,
      bio: "Rahul combines traditional poses with modern fitness principles for maximum calorie burn.",
    },
    {
      name: "Priya Desai",
      experience: "10 years",
      specialization: "Prenatal & Senior Yoga",
      rating: 5.0,
      bio: "Priya specializes in gentle, restorative yoga and is highly trained in prenatal care.",
    },
  ];

  for (const t of trainers) {
    await prisma.trainer.create({ data: t });
  }

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
