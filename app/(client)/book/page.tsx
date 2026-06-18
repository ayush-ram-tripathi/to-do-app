import { MultiStepForm } from "@/components/booking/MultiStepForm";
// In a real app with working DB seeding, we'd fetch these using Prisma:
// import { prisma } from "@/lib/prisma";

export default async function BookPage() {
  // MOCK DATA since DB seeding is pending Prisma v7 fixes
  const services = [
    { id: "s1", name: "Weight Loss Yoga", duration: 60, price: 1500 },
    { id: "s2", name: "Prenatal Yoga", duration: 45, price: 1800 },
    { id: "s3", name: "Corporate Yoga", duration: 30, price: 2000 },
    { id: "s4", name: "Meditation & Mindfulness", duration: 45, price: 1200 },
    { id: "s5", name: "Senior Citizen Yoga", duration: 45, price: 1500 },
  ];

  const trainers = [
    { id: "t1", name: "Anjali Sharma", specialization: "Hatha & Ashtanga Yoga", rating: 4.9 },
    { id: "t2", name: "Rahul Verma", specialization: "Weight Loss & Power Yoga", rating: 4.8 },
    { id: "t3", name: "Priya Desai", specialization: "Prenatal & Senior Yoga", rating: 5.0 },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-slate-900">
            Book Your Session
          </h1>
          <p className="text-lg text-slate-600 max-w-[600px] mx-auto">
            Ready to start your wellness journey? Fill out the form below and we'll match you with the perfect session.
          </p>
        </div>
        
        <MultiStepForm services={services} trainers={trainers} />
      </div>
    </div>
  );
}
