import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default async function ServicesPage() {
  const services = [
    { id: "s1", name: "Weight Loss Yoga", description: "A high-intensity yoga session designed to burn calories and build core strength.", duration: 60, price: 1500 },
    { id: "s2", name: "Prenatal Yoga", description: "Safe and gentle yoga for expectant mothers to prepare the body for childbirth.", duration: 45, price: 1800 },
    { id: "s3", name: "Corporate Yoga", description: "Office-friendly yoga to relieve desk stress and improve posture.", duration: 30, price: 2000 },
    { id: "s4", name: "Meditation & Mindfulness", description: "Deep relaxation and guided meditation techniques.", duration: 45, price: 1200 },
    { id: "s5", name: "Senior Citizen Yoga", description: "Gentle stretches and mobility work adapted for older adults.", duration: 45, price: 1500 },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-slate-900">
            Our Premium Services
          </h1>
          <p className="text-lg text-slate-600 max-w-[700px] mx-auto">
            Explore our range of personalized yoga sessions. Whether you want to lose weight, relax, or improve your flexibility, we have the perfect program for you.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Card key={service.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow flex flex-col">
              <div className="h-48 bg-emerald-100 rounded-t-xl" /> {/* Placeholder for image */}
              <CardHeader>
                <CardTitle>{service.name}</CardTitle>
                <CardDescription className="text-base">{service.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="flex items-center justify-between text-sm font-medium text-slate-600 mt-4">
                  <span>{service.duration} Minutes</span>
                  <span className="text-emerald-700 font-bold text-lg">₹{service.price}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full rounded-full" asChild>
                  <Link href={`/book?service=${service.id}`}>Book This Service</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
