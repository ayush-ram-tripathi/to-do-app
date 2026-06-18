import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="relative flex-1 flex items-center justify-center overflow-hidden bg-slate-50 py-24 md:py-32">
        <div className="container px-4 md:px-6 flex flex-col items-center text-center space-y-8 relative z-10">
          <div className="space-y-4 max-w-[800px]">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-slate-900">
              Transform Your Life With Pure Lifestyle Yoga
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-[600px] mx-auto">
              Experience premium, personalized yoga sessions in the comfort of your home. Connect your mind, body, and soul with our expert trainers.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button size="lg" className="h-14 px-8 text-lg rounded-full" asChild>
              <Link href="/book">Book Free Consultation</Link>
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full" asChild>
              <Link href="/services">Explore Services</Link>
            </Button>
          </div>
        </div>
        
        {/* Decorative background elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-100 rounded-full blur-3xl opacity-50 -z-10" />
      </section>

      {/* Benefits Section Placeholder */}
      <section className="py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Why Choose Us</h2>
            <p className="text-muted-foreground text-lg max-w-[600px] mx-auto">
              We bring the sanctuary of a premium yoga studio directly to you.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Benefit Cards will go here */}
          </div>
        </div>
      </section>
    </div>
  );
}
