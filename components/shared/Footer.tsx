import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-background/95">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold tracking-tight">Pure Lifestyle Yoga</h3>
            <p className="text-sm text-muted-foreground">
              Premium personalized yoga sessions at your home. Transform your mind, body, and soul.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/services" className="hover:text-foreground">Services</Link></li>
              <li><Link href="/trainers" className="hover:text-foreground">Trainers</Link></li>
              <li><Link href="/about" className="hover:text-foreground">About Us</Link></li>
              <li><Link href="/book" className="hover:text-foreground">Book Consultation</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/services" className="hover:text-foreground">Weight Loss Yoga</Link></li>
              <li><Link href="/services" className="hover:text-foreground">Prenatal Yoga</Link></li>
              <li><Link href="/services" className="hover:text-foreground">Corporate Yoga</Link></li>
              <li><Link href="/services" className="hover:text-foreground">Meditation</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>contact@purelifestyleyoga.com</li>
              <li>+91 98765 43210</li>
              <li>Mumbai, India</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Pure Lifestyle Yoga. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
