import { useNavigate } from 'react-router-dom';
import { Calendar, Video, Ambulance, Pill, Mail, Phone, MapPin } from 'lucide-react';
import { Card } from './ui/card';

const serviceCards = [
  { 
    id: 'appointment', 
    icon: Calendar, 
    title: 'Book Appointment',
    description: 'Schedule appointments with verified doctors',
    path: '/book-appointment',
    available: true
  },
  { 
    id: 'video', 
    icon: Video, 
    title: 'Video Consultation',
    description: 'Consult doctors from home',
    path: '#',
    available: false
  },
  { 
    id: 'ambulance', 
    icon: Ambulance, 
    title: 'Ambulance Contact',
    description: 'Find nearest ambulances quickly',
    path: '/ambulance',
    available: true
  },
  { 
    id: 'pharmacy', 
    icon: Pill, 
    title: 'Pharmacy Finder',
    description: 'Locate nearby pharmacies',
    path: '/pharmacy',
    available: true
  },
];

const Services = () => {
  const navigate = useNavigate();

  const handleServiceClick = (service: typeof serviceCards[0]) => {
    if (service.available) {
      navigate(service.path);
    }
  };

  return (
    <section id="services" className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Our Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive healthcare solutions designed to make your life easier
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
          {serviceCards.map((service) => (
            <Card
              key={service.id}
              className={`p-8 hover:shadow-xl transition-all cursor-pointer group relative overflow-hidden ${
                !service.available ? 'opacity-60' : ''
              }`}
              onClick={() => handleServiceClick(service)}
            >
              {!service.available && (
                <div className="absolute top-4 right-4 bg-muted text-muted-foreground text-xs px-3 py-1 rounded-full">
                  Coming Soon
                </div>
              )}
              
              <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <service.icon className="h-8 w-8 text-primary" />
              </div>
              
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-muted-foreground">{service.description}</p>
            </Card>
          ))}
        </div>

        {/* Contact Info */}
        <Card className="p-8 bg-gradient-to-r from-primary/5 to-secondary/5">
          <h3 className="text-2xl font-semibold mb-6 text-center">Contact Information</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Email</p>
                <p className="text-sm text-muted-foreground">support@healthcare.com</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Phone</p>
                <p className="text-sm text-muted-foreground">+91 1800 123 4567</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Address</p>
                <p className="text-sm text-muted-foreground">123 Health Street, City</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default Services;
