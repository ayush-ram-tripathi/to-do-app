import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-slate-50 py-16 md:py-24 border-b">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-slate-900">About Pure Lifestyle Yoga</h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              We are on a mission to bring the transformative power of yoga directly to your doorstep.
            </p>
          </div>
        </div>
      </div>

      <div className="container px-4 md:px-6 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-slate-900">Our Story</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Founded in 2023, Pure Lifestyle Yoga was born out of a simple idea: wellness should fit into your lifestyle, not the other way around. We noticed that many people struggled to find the time to travel to a yoga studio consistently.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              By bringing highly qualified and certified yoga instructors directly to your home, we eliminate the commute and the crowds, allowing you to focus purely on your mind, body, and soul.
            </p>
          </div>
          <div className="h-[400px] bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-800/50 shadow-inner">
            {/* Image Placeholder */}
            <span className="text-lg font-medium">Yoga Studio Image</span>
          </div>
        </div>

        <div className="mt-24 text-center max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold text-slate-900">Our Core Values</h2>
          <div className="grid sm:grid-cols-3 gap-8 mt-12">
            <div className="space-y-3">
              <div className="w-12 h-12 bg-emerald-100 rounded-full mx-auto flex items-center justify-center text-xl">🧘‍♀️</div>
              <h3 className="font-bold text-xl text-slate-900">Authenticity</h3>
              <p className="text-slate-600 text-sm">Honoring the ancient traditions of yoga while making it accessible for modern life.</p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 bg-emerald-100 rounded-full mx-auto flex items-center justify-center text-xl">⭐</div>
              <h3 className="font-bold text-xl text-slate-900">Premium Quality</h3>
              <p className="text-slate-600 text-sm">Providing only the most certified and experienced trainers for our clients.</p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 bg-emerald-100 rounded-full mx-auto flex items-center justify-center text-xl">🤝</div>
              <h3 className="font-bold text-xl text-slate-900">Personalization</h3>
              <p className="text-slate-600 text-sm">Tailoring every single session to the unique needs and goals of the individual.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
