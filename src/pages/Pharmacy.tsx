import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Pill, MapPin, Clock, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const mockPharmacies = [
  {
    id: 1,
    name: 'Apollo Pharmacy',
    address: 'Kalletumakara, Irinjalakuda,Kerala,680683',
    distance: '4 km',
    isOpen: true,
    hours: '8:00 AM - 10:00 PM',
    phone: '+91 98765 11111',
    mapsLink: 'https://maps.app.goo.gl/bSJbMWr3cfLVbV8HA?g_st=ipc'
  },
  {
    id: 2,
    name: 'Aster Pharmacy',
    address: 'Chadankunnu junction, irinjalakuda, kerala,680683',
    distance: '11 km',
    isOpen: true,
    hours: '24/7',
    phone: '+91 98765 22222',
    mapsLink: 'https://maps.app.goo.gl/XQV6DsP7vN2e6eiG9?g_st=ic'
  },
  {
    id: 3,
    name: 'Kottakal Aryavaidyasala Pharmacy',
    address: 'Kalletumakara, Irinjalakuda,Kerala,680683',
    distance: '3.8 km',
    isOpen: false,
    hours: '9:00 AM - 9:00 PM',
    phone: '+91 98765 33333',
    mapsLink: 'https://maps.app.goo.gl/EQEKxkpvVftkHBCz6?g_st=ic'
  }
];

const Pharmacy = () => {
  const [location, setLocation] = useState('');
  const [showResults, setShowResults] = useState(false);

  const handleSearch = () => {
    if (location.trim()) {
      setShowResults(true);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <Pill className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Pharmacy Finder</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Find Nearby Pharmacies</CardTitle>
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
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Nearby Pharmacies</h2>
              <p className="text-sm text-muted-foreground">{mockPharmacies.length} results found</p>
            </div>
            
            {mockPharmacies.map((pharmacy) => (
              <Card key={pharmacy.id}>
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="space-y-3 flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-semibold">{pharmacy.name}</h3>
                          <p className="text-muted-foreground text-sm">{pharmacy.address}</p>
                        </div>
                        <Badge variant={pharmacy.isOpen ? 'default' : 'secondary'}>
                          {pharmacy.isOpen ? 'Open' : 'Closed'}
                        </Badge>
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-primary" />
                          <span>{pharmacy.distance} away</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-primary" />
                          <span>{pharmacy.hours}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Button 
                        variant="outline"
                        onClick={() => window.open(pharmacy.mapsLink, '_blank')}
                        className="gap-2"
                      >
                        <MapPin className="h-4 w-4" />
                        Directions
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                      <Button 
                        onClick={() => window.location.href = `tel:${pharmacy.phone}`}
                      >
                        Call Pharmacy
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!showResults && (
          <Card className="bg-muted/50">
            <CardContent className="pt-6 text-center py-12">
              <Pill className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Find Pharmacies Near You</h3>
              <p className="text-muted-foreground">
                Enter your location to find nearby pharmacies with their operating hours and contact information
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Pharmacy;
