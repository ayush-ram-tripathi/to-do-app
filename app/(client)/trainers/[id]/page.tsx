import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function TrainerDetailPage({ params }: { params: { id: string } }) {
  // Mock data fetching based on ID
  const trainer = { 
    id: params.id, 
    name: "Anjali Sharma", 
    experience: "8 years", 
    specialization: "Hatha & Ashtanga Yoga", 
    rating: 4.9, 
    bio: "Anjali is a certified Ashtanga teacher who focuses on alignment and breath control. With over 8 years of experience teaching both beginners and advanced practitioners, she believes that yoga is a continuous journey of self-discovery.",
    certifications: ["200-Hour RYT Ashtanga", "Advanced Hatha Certification"],
    reviewsCount: 124,
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Profile Header */}
      <div className="bg-slate-50 py-12 md:py-20 border-b">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start max-w-4xl mx-auto">
            <div className="w-40 h-40 md:w-56 md:h-56 bg-slate-200 rounded-full shrink-0 shadow-lg" />
            <div className="text-center md:text-left space-y-4 flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-slate-900">{trainer.name}</h1>
                  <p className="text-xl text-emerald-700 font-medium mt-1">{trainer.specialization}</p>
                </div>
                <div className="flex items-center justify-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border">
                  <span className="text-amber-500 text-xl">★</span>
                  <span className="font-bold text-lg">{trainer.rating}</span>
                  <span className="text-slate-400 text-sm">({trainer.reviewsCount} reviews)</span>
                </div>
              </div>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-4">
                <Badge variant="secondary" className="px-3 py-1 text-sm">{trainer.experience} Experience</Badge>
                {trainer.certifications.map(cert => (
                  <Badge key={cert} variant="outline" className="px-3 py-1 text-sm">{cert}</Badge>
                ))}
              </div>

              <div className="pt-6">
                <Button size="lg" className="rounded-full w-full md:w-auto px-8" asChild>
                  <Link href={`/book?trainer=${trainer.id}`}>Book a Session with {trainer.name.split(" ")[0]}</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Details */}
      <div className="container px-4 md:px-6 py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">About Me</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              {trainer.bio}
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">What Customers Say</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[1, 2].map((i) => (
                <Card key={i} className="border-slate-100 shadow-sm">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex text-amber-500 text-sm">★★★★★</div>
                    <p className="text-slate-600 italic">"Amazing experience! Highly recommend for anyone looking to improve their practice."</p>
                    <p className="text-sm font-semibold">- Happy Customer</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
