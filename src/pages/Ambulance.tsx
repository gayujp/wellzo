import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Ambulance as AmbulanceIcon, Phone, MapPin } from 'lucide-react';

const mockAmbulances = [
  {
    id: 1,
    name: 'City Emergency Services',
    driver: 'Rajesh Kumar',
    phone: '+91 98765 43210',
    distance: '2.5 km',
    eta: '8 mins',
    available: true
  },
  {
    id: 2,
    name: 'LifeLine Ambulance',
    driver: 'Amit Sharma',
    phone: '+91 98765 43211',
    distance: '3.8 km',
    eta: '12 mins',
    available: true
  },
  {
    id: 3,
    name: 'Quick Response Medical',
    driver: 'Suresh Patel',
    phone: '+91 98765 43212',
    distance: '5.2 km',
    eta: '15 mins',
    available: false
  }
];

const Ambulance = () => {
  const [location, setLocation] = useState('');
  const [showResults, setShowResults] = useState(false);

  const handleSearch = () => {
    if (location.trim()) {
      setShowResults(true);
    }
  };

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <AmbulanceIcon className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Ambulance Contact</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Search for Ambulances</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                placeholder="Enter your location..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <Button onClick={handleSearch}>
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </CardContent>
        </Card>

        {showResults && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Available Ambulances Near You</h2>
            {mockAmbulances.map((ambulance) => (
              <Card 
                key={ambulance.id} 
                className={`${!ambulance.available ? 'opacity-60' : ''}`}
              >
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-semibold">{ambulance.name}</h3>
                          <p className="text-muted-foreground">Driver: {ambulance.driver}</p>
                        </div>
                        {!ambulance.available && (
                          <span className="text-sm bg-muted px-3 py-1 rounded-full">
                            Busy
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-primary" />
                          <span>{ambulance.distance} away</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <AmbulanceIcon className="h-4 w-4 text-primary" />
                          <span>ETA: {ambulance.eta}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Button 
                        onClick={() => handleCall(ambulance.phone)}
                        disabled={!ambulance.available}
                        className="gap-2"
                      >
                        <Phone className="h-4 w-4" />
                        Call Now
                      </Button>
                      <p className="text-xs text-center text-muted-foreground">
                        {ambulance.phone}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <Card className="bg-destructive/10 border-destructive/20">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-full bg-destructive/20 flex items-center justify-center flex-shrink-0">
                <Phone className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Emergency?</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  For immediate life-threatening emergencies, call 112 directly or use the SOS button in the top navigation.
                </p>
                <Button variant="destructive" onClick={() => window.location.href = 'tel:112'}>
                  Call 112 Now
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Ambulance;
