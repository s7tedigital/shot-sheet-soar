import { useState } from 'react';
import { 
  Plus, 
  Search, 
  Users, 
  Phone, 
  Mail, 
  MapPin,
  Star,
  Calendar,
  MoreHorizontal,
  Edit,
  Trash2,
  UserPlus
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface CrewMember {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  location: string;
  rating: number;
  projectsCount: number;
  availability: 'available' | 'busy' | 'unavailable';
  avatar?: string;
}

const mockCrewMembers: CrewMember[] = [
  {
    id: '1',
    name: 'John Doe',
    role: 'Director of Photography',
    department: 'Camera',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    location: 'Los Angeles, CA',
    rating: 4.9,
    projectsCount: 15,
    availability: 'available'
  },
  {
    id: '2',
    name: 'Lisa Chen',
    role: 'Producer',
    department: 'Production',
    email: 'lisa.chen@email.com',
    phone: '+1 (555) 234-5678',
    location: 'New York, NY',
    rating: 4.8,
    projectsCount: 22,
    availability: 'busy'
  },
  {
    id: '3',
    name: 'Mike Wilson',
    role: 'Sound Engineer',
    department: 'Audio',
    email: 'mike.wilson@email.com',
    phone: '+1 (555) 345-6789',
    location: 'Los Angeles, CA',
    rating: 4.7,
    projectsCount: 18,
    availability: 'available'
  },
  {
    id: '4',
    name: 'Sarah Martinez',
    role: 'Film Editor',
    department: 'Post-Production',
    email: 'sarah.martinez@email.com',
    phone: '+1 (555) 456-7890',
    location: 'Atlanta, GA',
    rating: 4.9,
    projectsCount: 20,
    availability: 'unavailable'
  },
  {
    id: '5',
    name: 'Alex Rodriguez',
    role: 'Cinematographer',
    department: 'Camera',
    email: 'alex.rodriguez@email.com',
    phone: '+1 (555) 567-8901',
    location: 'Miami, FL',
    rating: 4.6,
    projectsCount: 12,
    availability: 'available'
  },
  {
    id: '6',
    name: 'Emma Thompson',
    role: 'Art Director',
    department: 'Art',
    email: 'emma.thompson@email.com',
    phone: '+1 (555) 678-9012',
    location: 'Los Angeles, CA',
    rating: 4.8,
    projectsCount: 16,
    availability: 'busy'
  }
];

const getAvailabilityColor = (availability: string) => {
  switch (availability) {
    case 'available': return 'bg-success text-success-foreground';
    case 'busy': return 'bg-warning text-warning-foreground';
    case 'unavailable': return 'bg-destructive text-destructive-foreground';
    default: return 'bg-muted text-muted-foreground';
  }
};

const Crew = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const departments = ['all', 'Camera', 'Production', 'Audio', 'Post-Production', 'Art'];
  
  const filteredCrew = mockCrewMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || member.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) 
            ? 'text-yellow-400 fill-current' 
            : 'text-muted-foreground'
        }`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Crew Management</h2>
          <p className="text-muted-foreground mt-1">
            Manage your film production team members
          </p>
        </div>
        <Button className="bg-gradient-primary hover:bg-primary-hover shadow-lg hover-glow">
          <Plus className="mr-2 h-4 w-4" />
          Add Crew Member
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Crew</p>
                <p className="text-2xl font-bold">{mockCrewMembers.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
                <Users className="h-4 w-4 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Available</p>
                <p className="text-2xl font-bold text-success">
                  {mockCrewMembers.filter(m => m.availability === 'available').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-warning/10 rounded-lg flex items-center justify-center">
                <Calendar className="h-4 w-4 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Busy</p>
                <p className="text-2xl font-bold text-warning">
                  {mockCrewMembers.filter(m => m.availability === 'busy').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Star className="h-8 w-8 text-yellow-400 fill-current" />
              <div>
                <p className="text-sm text-muted-foreground">Avg. Rating</p>
                <p className="text-2xl font-bold">
                  {(mockCrewMembers.reduce((sum, m) => sum + m.rating, 0) / mockCrewMembers.length).toFixed(1)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search crew members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {departments.map((dept) => (
                <Button
                  key={dept}
                  variant={selectedDepartment === dept ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedDepartment(dept)}
                >
                  {dept === 'all' ? 'All Departments' : dept}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Crew Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCrew.map((member) => (
          <Card key={member.id} className="hover-lift">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{member.name}</CardTitle>
                    <CardDescription>{member.role}</CardDescription>
                  </div>
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Add to Project
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Remove
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="flex items-center justify-between mt-2">
                <Badge variant="outline">{member.department}</Badge>
                <Badge className={getAvailabilityColor(member.availability)}>
                  {member.availability}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  {renderStars(member.rating)}
                </div>
                <span className="text-sm font-medium">{member.rating}</span>
              </div>

              <div className="text-sm text-muted-foreground">
                <div className="flex items-center space-x-1 mb-1">
                  <Mail className="h-4 w-4" />
                  <span className="truncate">{member.email}</span>
                </div>
                <div className="flex items-center space-x-1 mb-1">
                  <Phone className="h-4 w-4" />
                  <span>{member.phone}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span>{member.location}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  {member.projectsCount} projects completed
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCrew.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No crew members found</h3>
            <p className="text-muted-foreground text-center max-w-md">
              Try adjusting your search terms or department filter.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Crew;