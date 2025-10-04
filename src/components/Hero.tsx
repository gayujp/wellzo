import { Button } from './ui/button';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left: Content */}
        <div className="space-y-6">
          <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
            Welcome to Wellzo
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Your Health,
            <span className="text-primary"> Our Priority</span>
          </h1>
          
          <p className="text-lg text-muted-foreground">
            Access quality healthcare services at your fingertips. Book appointments, 
            consult with doctors, find pharmacies, and get AI-powered health assistance 
            - all in one place.
          </p>

          <div className="flex gap-4">
            <Button size="lg" onClick={scrollToServices}>
              Explore Services
            </Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground animate-bounce cursor-pointer" onClick={scrollToServices}>
            <span className="text-sm">Scroll to explore</span>
            <ArrowDown className="h-4 w-4" />
          </div>
        </div>

        {/* Right: Image */}
        <div className="relative">
          <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
            <img 
              src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=800&q=80"
              alt="Healthcare professional"
              className="rounded-2xl object-cover w-full h-full"
            />
          </div>
          
          {/* Floating cards */}
          <div className="absolute -top-6 -right-6 bg-card p-4 rounded-xl shadow-lg border">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-2xl">🏥</span>
              </div>
              <div>
                <p className="font-semibold">24/7 Available</p>
                <p className="text-sm text-muted-foreground">Always here for you</p>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-6 -left-6 bg-card p-4 rounded-xl shadow-lg border">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center">
                <span className="text-2xl">⚕️</span>
              </div>
              <div>
                <p className="font-semibold">Expert Doctors</p>
                <p className="text-sm text-muted-foreground">Verified professionals</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
