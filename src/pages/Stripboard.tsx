import { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  Search,
  Filter,
  MapPin,
  Clock,
  Users,
  Camera,
  FileText,
  GripVertical,
  MoreHorizontal,
  Play,
  Pause,
  CheckCircle2,
  Eye
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { mockScenes, Scene, SceneStatus } from '@/data/mockData';
import { cn } from '@/lib/utils';

const statusOptions: { value: SceneStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'All Scenes' },
  { value: 'completed', label: 'Completed' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'not-filmed', label: 'Not Filmed' },
  { value: 'review', label: 'Review' },
];

const locationOptions = [
  { value: 'all', label: 'All Locations' },
  { value: 'downtown-coffee-shop', label: 'Downtown Coffee Shop' },
  { value: 'apartment-set', label: 'Apartment Set' },
  { value: '5th-avenue', label: '5th Avenue' },
  { value: 'downtown-rooftop', label: 'Downtown Rooftop' },
  { value: 'office-set', label: 'Office Set' },
];

const timeOfDayOptions = [
  { value: 'all', label: 'All Times' },
  { value: 'day', label: 'Day' },
  { value: 'night', label: 'Night' },
  { value: 'dawn', label: 'Dawn' },
  { value: 'dusk', label: 'Dusk' },
  { value: 'interior', label: 'Interior' },
];

const getStatusColor = (status: SceneStatus) => {
  switch (status) {
    case 'completed': return 'bg-success text-success-foreground';
    case 'in-progress': return 'bg-warning text-warning-foreground';
    case 'not-filmed': return 'bg-destructive text-destructive-foreground';
    case 'review': return 'bg-purple-500 text-white';
    default: return 'bg-muted text-muted-foreground';
  }
};

const getStatusIcon = (status: SceneStatus) => {
  switch (status) {
    case 'completed': return CheckCircle2;
    case 'in-progress': return Play;
    case 'not-filmed': return Pause;
    case 'review': return Eye;
    default: return Pause;
  }
};

interface SortableSceneProps {
  scene: Scene;
}

const SortableScene = ({ scene }: SortableSceneProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: scene.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const StatusIcon = getStatusIcon(scene.status);

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={cn(
        "hover-lift transition-all duration-200 cursor-pointer",
        isDragging && "opacity-50 shadow-xl scale-105"
      )}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1">
            <Button
              variant="ghost"
              size="icon"
              className="mt-1 cursor-grab active:cursor-grabbing"
              {...attributes}
              {...listeners}
            >
              <GripVertical className="h-4 w-4 text-muted-foreground" />
            </Button>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-sm font-mono bg-muted px-2 py-1 rounded text-muted-foreground">
                  {scene.number}
                </span>
                <Badge className={getStatusColor(scene.status)}>
                  <StatusIcon className="w-3 h-3 mr-1" />
                  {scene.status.replace('-', ' ')}
                </Badge>
              </div>
              
              <CardTitle className="text-lg text-foreground">
                {scene.title}
              </CardTitle>
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
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Play className="mr-2 h-4 w-4" />
                Mark In Progress
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Mark Completed
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {scene.description}
        </p>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-foreground truncate">{scene.location}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-foreground">{scene.timeOfDay}</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="text-center">
            <p className="text-muted-foreground">Duration</p>
            <p className="font-medium text-foreground">{scene.duration}m</p>
          </div>
          <div className="text-center">
            <p className="text-muted-foreground">Pages</p>
            <p className="font-medium text-foreground">{scene.pages}</p>
          </div>
          <div className="text-center">
            <p className="text-muted-foreground">Cast</p>
            <p className="font-medium text-foreground">{scene.cast.length}</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-sm">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Cast:</span>
            <span className="text-foreground truncate">{scene.cast.join(', ')}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Camera className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Equipment:</span>
            <span className="text-foreground truncate">{scene.equipment.join(', ')}</span>
          </div>
        </div>

        {scene.notes && (
          <div className="flex items-start space-x-2 text-sm">
            <FileText className="h-4 w-4 text-muted-foreground mt-0.5" />
            <div>
              <span className="text-muted-foreground">Notes:</span>
              <p className="text-foreground">{scene.notes}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const Stripboard = () => {
  const [scenes, setScenes] = useState<Scene[]>(mockScenes);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<SceneStatus | 'all'>('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [timeFilter, setTimeFilter] = useState('all');

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setScenes((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const filteredScenes = scenes.filter(scene => {
    const matchesSearch = scene.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scene.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scene.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || scene.status === statusFilter;
    const matchesLocation = locationFilter === 'all' || 
                           scene.location.toLowerCase().includes(locationFilter.replace('-', ' '));
    const matchesTime = timeFilter === 'all' || scene.timeOfDay === timeFilter;
    
    return matchesSearch && matchesStatus && matchesLocation && matchesTime;
  });

  const getStatsForStatus = (status: SceneStatus) => {
    return scenes.filter(scene => scene.status === status).length;
  };

  const totalDuration = filteredScenes.reduce((sum, scene) => sum + scene.duration, 0);
  const totalPages = filteredScenes.reduce((sum, scene) => sum + scene.pages, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Stripboard</h2>
          <p className="text-muted-foreground mt-1">
            Drag and drop to reorder your filming schedule
          </p>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="h-4 w-4 text-success" />
              </div>
              <div>
                <p className="text-sm font-medium">Completed</p>
                <p className="text-2xl font-bold text-success">{getStatsForStatus('completed')}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-warning/10 rounded-lg flex items-center justify-center">
                <Play className="h-4 w-4 text-warning" />
              </div>
              <div>
                <p className="text-sm font-medium">In Progress</p>
                <p className="text-2xl font-bold text-warning">{getStatsForStatus('in-progress')}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Clock className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Total Duration</p>
                <p className="text-2xl font-bold text-primary">{totalDuration}m</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-info/10 rounded-lg flex items-center justify-center">
                <FileText className="h-4 w-4 text-info" />
              </div>
              <div>
                <p className="text-sm font-medium">Total Pages</p>
                <p className="text-2xl font-bold text-info">{totalPages}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search scenes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as SceneStatus | 'all')}>
              <SelectTrigger>
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger>
                <MapPin className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by location" />
              </SelectTrigger>
              <SelectContent>
                {locationOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={timeFilter} onValueChange={setTimeFilter}>
              <SelectTrigger>
                <Clock className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by time" />
              </SelectTrigger>
              <SelectContent>
                {timeOfDayOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Stripboard */}
      <div className="space-y-4">
        {filteredScenes.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No scenes found</h3>
              <p className="text-muted-foreground text-center max-w-md">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
            </CardContent>
          </Card>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={filteredScenes.map(s => s.id)} strategy={verticalListSortingStrategy}>
              <div className="space-y-4">
                {filteredScenes.map((scene) => (
                  <SortableScene key={scene.id} scene={scene} />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>
    </div>
  );
};

export default Stripboard;