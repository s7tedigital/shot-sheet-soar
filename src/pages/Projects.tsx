import { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Grid, 
  List, 
  Calendar, 
  Users, 
  DollarSign,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { mockProjects, ProjectStatus } from '@/data/mockData';
import { cn } from '@/lib/utils';

const statusOptions: { value: ProjectStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'All Projects' },
  { value: 'in-production', label: 'In Production' },
  { value: 'pre-production', label: 'Pre-Production' },
  { value: 'post-production', label: 'Post-Production' },
  { value: 'completed', label: 'Completed' },
  { value: 'paused', label: 'Paused' },
];

const getStatusColor = (status: ProjectStatus) => {
  switch (status) {
    case 'in-production': return 'bg-primary text-primary-foreground';
    case 'pre-production': return 'bg-warning text-warning-foreground';
    case 'post-production': return 'bg-info text-info-foreground';
    case 'completed': return 'bg-success text-success-foreground';
    case 'paused': return 'bg-muted text-muted-foreground';
    default: return 'bg-muted text-muted-foreground';
  }
};

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | 'all'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredProjects = mockProjects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.director.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatBudget = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(amount);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const ProjectCard = ({ project }: { project: typeof mockProjects[0] }) => (
    <Card className="hover-lift transition-all duration-200 group">
      {/* Project Thumbnail */}
      <div className="relative h-48 rounded-t-lg overflow-hidden">
        <img 
          src={project.thumbnail} 
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <Badge className={cn(getStatusColor(project.status), "absolute top-3 left-3")}>
          {project.status.replace('-', ' ')}
        </Badge>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" />
              Edit Project
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Project
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg group-hover:text-primary transition-colors">
              {project.title}
            </CardTitle>
            <CardDescription className="mt-1">
              Directed by {project.director}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {project.description}
        </p>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{project.progress}%</span>
          </div>
          <Progress value={project.progress} className="h-2" />
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Start Date</p>
              <p className="font-medium">{formatDate(project.startDate)}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">End Date</p>
              <p className="font-medium">{formatDate(project.endDate)}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-1">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{project.crew.length} crew</span>
          </div>
          <div className="flex items-center space-x-1">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">{formatBudget(project.budget)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const ProjectListItem = ({ project }: { project: typeof mockProjects[0] }) => (
    <Card className="hover-lift transition-all duration-200">
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
            <img 
              src={project.thumbnail} 
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex-1 min-w-0 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground truncate">
                {project.title}
              </h3>
              <Badge className={getStatusColor(project.status)}>
                {project.status.replace('-', ' ')}
              </Badge>
            </div>
            
            <p className="text-sm text-muted-foreground line-clamp-1">
              {project.description}
            </p>
            
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <span>Dir: {project.director}</span>
              <span>{project.crew.length} crew members</span>
              <span>{formatBudget(project.budget)}</span>
              <span>{formatDate(project.startDate)} - {formatDate(project.endDate)}</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <Progress value={project.progress} className="h-2" />
              </div>
              <span className="text-sm font-medium">{project.progress}%</span>
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
                <Edit className="mr-2 h-4 w-4" />
                Edit Project
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Project
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Projects</h2>
          <p className="text-muted-foreground mt-1">
            Manage your film production projects
          </p>
        </div>
        <Button className="bg-gradient-primary hover:bg-primary-hover shadow-lg hover-glow">
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>

      {/* Filters and Controls */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by title or director..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as ProjectStatus | 'all')}>
                <SelectTrigger className="w-full sm:w-48">
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
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Projects Display */}
      {filteredProjects.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No projects found</h3>
            <p className="text-muted-foreground text-center max-w-md">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className={cn(
          viewMode === 'grid' 
            ? "grid gap-6 md:grid-cols-2 lg:grid-cols-3" 
            : "space-y-4"
        )}>
          {filteredProjects.map((project) => (
            viewMode === 'grid' ? (
              <ProjectCard key={project.id} project={project} />
            ) : (
              <ProjectListItem key={project.id} project={project} />
            )
          ))}
        </div>
      )}
    </div>
  );
};

export default Projects;