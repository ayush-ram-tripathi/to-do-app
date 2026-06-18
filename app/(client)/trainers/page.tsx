import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default async function TrainersPage() {
  const trainers = [
    { id: "t1", name: "Anjali Sharma", experience: "8 years", specialization: "Hatha & Ashtanga Yoga", rating: 4.9, bio: "Anjali is a certified Ashtanga teacher who focuses on alignment and breath control." },
    { id: "t2", name: "Rahul Verma", experience: "5 years", specialization: "Weight Loss & Power Yoga", rating: 4.8, bio: "Rahul combines traditional poses with modern fitness principles for maximum calorie burn." },
    { id: "t3", name: "Priya Desai", experience: "10 years", specialization: "Prenatal & Senior Yoga", rating: 5.0, bio: "Priya specializes in gentle, restorative yoga and is highly trained in prenatal care." },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-slate-900">
            Meet Our Expert Trainers
          </h1>
          <p className="text-lg text-slate-600 max-w-[700px] mx-auto">
            Our trainers are certified professionals dedicated to helping you achieve your wellness goals safely and effectively.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {trainers.map((trainer) => (
            <Card key={trainer.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow text-center">
              <CardHeader className="pt-8">
                <div className="w-32 h-32 bg-slate-200 rounded-full mx-auto mb-4" /> {/* Avatar placeholder */}
                <CardTitle className="text-2xl">{trainer.name}</CardTitle>
                <CardDescription className="text-emerald-700 font-medium">{trainer.specialization}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-slate-600 line-clamp-3">{trainer.bio}</p>
                <div className="flex items-center justify-center gap-4 text-sm font-medium">
                  <span className="flex items-center gap-1">
                    <span className="text-amber-500">★</span> {trainer.rating}
                  </span>
                  <span className="text-slate-300">|</span>
                  <span>{trainer.experience} Exp.</span>
                </div>
              </CardContent>
              <CardFooter className="flex gap-4 justify-center pb-8">
                <Button variant="outline" className="rounded-full w-full" asChild>
                  <Link href={`/trainers/${trainer.id}`}>View Profile</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
