import { Heart, Shield, Users, Clock } from 'lucide-react';
import { Card } from './ui/card';

const values = [
  {
    icon: Heart,
    title: 'Patient-Centered Care',
    description: 'We prioritize your health and well-being above all else'
  },
  {
    icon: Shield,
    title: 'Trust & Security',
    description: 'Your medical data is protected with top-tier security measures'
  },
  {
    icon: Users,
    title: 'Expert Network',
    description: 'Access to verified healthcare professionals across specializations'
  },
  {
    icon: Clock,
    title: '24/7 Availability',
    description: 'Healthcare support available whenever you need it'
  }
];

const About = () => {
  return (
    <section id="about" className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">About Wellzo</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Revolutionizing healthcare access through innovative technology and compassionate care
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">Our Mission</h3>
            <p className="text-muted-foreground leading-relaxed">
              We're on a mission to make quality healthcare accessible to everyone. By leveraging 
              cutting-edge technology and partnering with trusted healthcare providers, we're 
              breaking down barriers and creating a seamless healthcare experience.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Whether you need to book an appointment, find emergency services, or get health 
              advice from our AI assistant, we're here to support your healthcare journey every 
              step of the way.
            </p>
          </div>

          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80"
              alt="Healthcare team"
              className="rounded-2xl object-cover w-full h-full shadow-lg"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <value.icon className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-semibold mb-2">{value.title}</h4>
              <p className="text-sm text-muted-foreground">{value.description}</p>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Card className="p-8 bg-gradient-to-r from-primary/10 to-secondary/10">
            <h3 className="text-2xl font-semibold mb-4">Join Thousands of Satisfied Users</h3>
            <p className="text-muted-foreground mb-6">
              Start your healthcare journey with us today
            </p>
            <div className="flex justify-center gap-8 text-center">
              <div>
                <p className="text-3xl font-bold text-primary">10+</p>
                <p className="text-sm text-muted-foreground">Active Users</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">1</p>
                <p className="text-sm text-muted-foreground">Verified Doctors</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">50+</p>
                <p className="text-sm text-muted-foreground">Appointments Booked</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About;
