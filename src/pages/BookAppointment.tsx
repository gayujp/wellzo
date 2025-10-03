import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, DollarSign, GraduationCap, Star } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const specializations = [
  'Gynecologist',
  'Dentist',
  'Cardiologist',
  'Pediatrician',
  'Dermatologist',
  'Orthopedic',
  'General Physician'
];

const mockDoctors = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    hospital: 'City General Hospital',
    fees: '₹500',
    qualification: 'MBBS, MD (Gynecology)',
    experience: '12 years',
    availability: 'Available this week',
    rating: 4.8,
    location: 'Downtown Medical Center'
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    hospital: 'Sunrise Clinic',
    fees: '₹400',
    qualification: 'MBBS, MD',
    experience: '8 years',
    availability: 'Available this week',
    rating: 4.6,
    location: 'Westside Healthcare'
  }
];

const BookAppointment = () => {
  const { toast } = useToast();
  const [selectedSpecialization, setSelectedSpecialization] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState<typeof mockDoctors[0] | null>(null);

  const handleBooking = () => {
    toast({
      title: "Booking Confirmed",
      description: "You'll receive a confirmation SMS and reminder 1 day before your appointment.",
    });
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Book Appointment</h1>

        <Card>
          <CardHeader>
            <CardTitle>Select Specialization</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={selectedSpecialization} onValueChange={setSelectedSpecialization}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a specialization" />
              </SelectTrigger>
              <SelectContent>
                {specializations.map((spec) => (
                  <SelectItem key={spec} value={spec}>
                    {spec}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {selectedSpecialization && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Available Doctors</h2>
            {mockDoctors.map((doctor) => (
              <Card key={doctor.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="space-y-3 flex-1">
                      <div>
                        <h3 className="text-xl font-semibold">{doctor.name}</h3>
                        <p className="text-muted-foreground">{doctor.qualification}</p>
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-primary" />
                          <span>{doctor.hospital}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-primary" />
                          <span>{doctor.fees}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <GraduationCap className="h-4 w-4 text-primary" />
                          <span>{doctor.experience}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span>{doctor.rating}/5</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Badge variant="secondary">
                          <Calendar className="h-3 w-3 mr-1" />
                          {doctor.availability}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Button 
                        onClick={() => setSelectedDoctor(doctor)}
                        variant="outline"
                      >
                        View Details
                      </Button>
                      <Button onClick={handleBooking}>
                        Book Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {selectedDoctor && (
          <Card className="border-primary">
            <CardHeader>
              <CardTitle>Doctor Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Location</h4>
                <p className="text-muted-foreground">{selectedDoctor.location}</p>
                <Button variant="link" className="px-0">
                  View on Google Maps →
                </Button>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Future Availability</h4>
                <div className="grid grid-cols-3 gap-2">
                  <Button variant="outline" size="sm">Mon 10AM</Button>
                  <Button variant="outline" size="sm">Wed 2PM</Button>
                  <Button variant="outline" size="sm">Fri 11AM</Button>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Patient Reviews</h4>
                <p className="text-muted-foreground">
                  "Excellent doctor, very professional and caring." - Patient A
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default BookAppointment;
