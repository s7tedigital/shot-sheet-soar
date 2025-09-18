import { Plus, TrendingUp, Film, Calendar, DollarSign, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { mockProjects, mockCrewActivities, getDashboardStats, weeklyProgressData } from '@/data/mockData';
import { useNavigate } from 'react-router-dom';

const getStatusColor = (status: string) => {
  switch (status) {
    case 'in-production': return 'bg-primary text-primary-foreground';
    case 'pre-production': return 'bg-warning text-warning-foreground';
    case 'post-production': return 'bg-info text-info-foreground';
    case 'completed': return 'bg-success text-success-foreground';
    case 'paused': return 'bg-muted text-muted-foreground';
    default: return 'bg-muted text-muted-foreground';
  }
};

const Dashboard = () => {
  const navigate = useNavigate();
  const stats = getDashboardStats();

  const formatBudget = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(amount);
  };

  const getTimeRemaining = (endDate: string) => {
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Overdue';
    if (diffDays === 0) return 'Due today';
    return `${diffDays} days`;
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-8">
      {/* Header with New Project Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Welcome back, Sarah</h2>
          <p className="text-muted-foreground mt-1">
            Here's what's happening with your film projects today.
          </p>
        </div>
        <Button 
          onClick={() => navigate('/projects')}
          className="bg-gradient-primary hover:bg-primary-hover shadow-lg hover-glow"
          size="lg"
        >
          <Plus className="mr-2 h-5 w-5" />
          New Project
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <Film className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stats.totalProjects}</div>
            <p className="text-xs text-muted-foreground">
              +2 from last month
            </p>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{stats.activeProjects}</div>
            <p className="text-xs text-muted-foreground">
              Currently in production
            </p>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scenes Shot</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {stats.shotScenes}/{stats.totalScenes}
            </div>
            <p className="text-xs text-muted-foreground">
              {Math.round((stats.shotScenes / stats.totalScenes) * 100)}% completion rate
            </p>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-info">
              {formatBudget(stats.totalBudget)}
            </div>
            <p className="text-xs text-muted-foreground">
              Across all projects
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Weekly Progress Chart */}
        <Card className="hover-lift">
          <CardHeader>
            <CardTitle>Weekly Project Progress</CardTitle>
            <CardDescription>
              Track your filming schedule progress over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyProgressData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis 
                    dataKey="week" 
                    className="text-xs"
                  />
                  <YAxis className="text-xs" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="progress"
                    stroke="hsl(var(--primary))"
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                    name="Actual Progress"
                  />
                  <Line
                    type="monotone"
                    dataKey="planned"
                    stroke="hsl(var(--muted-foreground))"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ fill: 'hsl(var(--muted-foreground))', strokeWidth: 2, r: 4 }}
                    name="Planned Progress"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Projects */}
        <Card className="hover-lift">
          <CardHeader>
            <CardTitle>Recent Projects</CardTitle>
            <CardDescription>
              Latest updates from your active film projects
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockProjects.slice(0, 4).map((project) => (
                <div key={project.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-accent transition-colors cursor-pointer">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                    <Film className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-foreground truncate">
                        {project.title}
                      </p>
                      <Badge className={getStatusColor(project.status)}>
                        {project.status.replace('-', ' ')}
                      </Badge>
                    </div>
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                        <span>{project.progress}% complete</span>
                        <span>{getTimeRemaining(project.endDate)}</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Crew: {project.crew.length} members
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card className="hover-lift">
        <CardHeader>
          <CardTitle>Recent Crew Activities</CardTitle>
          <CardDescription>
            Latest updates from your team members
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockCrewActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-accent transition-colors">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <Clock className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">
                    <span className="font-medium">{activity.memberName}</span>{' '}
                    {activity.action} in{' '}
                    <span className="font-medium">{activity.projectTitle}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatTimestamp(activity.timestamp)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;