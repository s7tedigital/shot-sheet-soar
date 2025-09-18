import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Download, 
  Calendar, 
  TrendingUp, 
  DollarSign, 
  Clock, 
  FileText,
  Users,
  Film
} from 'lucide-react';

// Mock data for charts
const monthlyProgressData = [
  { month: 'Jan', completed: 12, planned: 15, budget: 320000 },
  { month: 'Feb', completed: 18, planned: 20, budget: 445000 },
  { month: 'Mar', completed: 25, planned: 25, budget: 380000 },
  { month: 'Apr', completed: 22, planned: 24, budget: 520000 },
  { month: 'May', completed: 28, planned: 30, budget: 680000 },
  { month: 'Jun', completed: 35, planned: 35, budget: 720000 },
];

const projectStatusData = [
  { name: 'In Production', value: 2, color: '#3b82f6' },
  { name: 'Pre-Production', value: 1, color: '#f59e0b' },
  { name: 'Post-Production', value: 1, color: '#06b6d4' },
  { name: 'Completed', value: 1, color: '#10b981' },
  { name: 'Paused', value: 1, color: '#6b7280' },
];

const departmentBudgetData = [
  { department: 'Camera', budget: 450000, percentage: 25 },
  { department: 'Production', budget: 380000, percentage: 21 },
  { department: 'Post-Production', budget: 320000, percentage: 18 },
  { department: 'Audio', budget: 280000, percentage: 16 },
  { department: 'Art', budget: 220000, percentage: 12 },
  { department: 'Other', budget: 150000, percentage: 8 },
];

const crewPerformanceData = [
  { name: 'John Doe', projects: 15, rating: 4.9, efficiency: 95 },
  { name: 'Lisa Chen', projects: 22, rating: 4.8, efficiency: 92 },
  { name: 'Mike Wilson', projects: 18, rating: 4.7, efficiency: 88 },
  { name: 'Sarah Martinez', projects: 20, rating: 4.9, efficiency: 96 },
  { name: 'Alex Rodriguez', projects: 12, rating: 4.6, efficiency: 85 },
];

const Reports = () => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(value);
  };

  const totalBudget = departmentBudgetData.reduce((sum, item) => sum + item.budget, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Reports & Analytics</h2>
          <p className="text-muted-foreground mt-1">
            Comprehensive insights into your film production performance
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Custom Range
          </Button>
          <Button className="bg-gradient-primary hover:bg-primary-hover">
            <Download className="mr-2 h-4 w-4" />
            Export Reports
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover-lift">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Film className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Projects</p>
                <p className="text-2xl font-bold">6</p>
                <p className="text-xs text-success">+2 this month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Completion Rate</p>
                <p className="text-2xl font-bold">89%</p>
                <p className="text-xs text-success">+12% from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-warning/10 rounded-lg flex items-center justify-center">
                <DollarSign className="h-4 w-4 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Budget</p>
                <p className="text-2xl font-bold">{formatCurrency(totalBudget)}</p>
                <p className="text-xs text-muted-foreground">Across all projects</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-info/10 rounded-lg flex items-center justify-center">
                <Users className="h-4 w-4 text-info" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Crew</p>
                <p className="text-2xl font-bold">24</p>
                <p className="text-xs text-muted-foreground">Across all departments</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Monthly Progress */}
        <Card className="hover-lift">
          <CardHeader>
            <CardTitle>Monthly Progress & Budget</CardTitle>
            <CardDescription>
              Track completion rates and budget allocation over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyProgressData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip 
                    formatter={(value, name) => [
                      name === 'budget' ? formatCurrency(Number(value)) : value,
                      name
                    ]}
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Legend />
                  <Bar yAxisId="left" dataKey="completed" fill="hsl(var(--primary))" name="Completed" />
                  <Bar yAxisId="left" dataKey="planned" fill="hsl(var(--muted))" name="Planned" />
                  <Line yAxisId="right" dataKey="budget" stroke="hsl(var(--success))" name="Budget" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Project Status Distribution */}
        <Card className="hover-lift">
          <CardHeader>
            <CardTitle>Project Status Distribution</CardTitle>
            <CardDescription>
              Current breakdown of project statuses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={projectStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {projectStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Department Budget Allocation */}
        <Card className="hover-lift">
          <CardHeader>
            <CardTitle>Budget Allocation by Department</CardTitle>
            <CardDescription>
              How your budget is distributed across departments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {departmentBudgetData.map((dept, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    <span className="text-sm font-medium">{dept.department}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge variant="outline">{dept.percentage}%</Badge>
                    <span className="text-sm font-bold">{formatCurrency(dept.budget)}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Crew Performance */}
        <Card className="hover-lift">
          <CardHeader>
            <CardTitle>Top Crew Performance</CardTitle>
            <CardDescription>
              Efficiency and rating metrics for key team members
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {crewPerformanceData.map((member, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {member.projects} projects • {member.rating}★ rating
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">{member.efficiency}%</p>
                    <p className="text-xs text-muted-foreground">Efficiency</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Summary */}
      <Card className="hover-lift">
        <CardHeader>
          <CardTitle>Recent Activity Summary</CardTitle>
          <CardDescription>
            Key metrics and insights from the past 30 days
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="text-center">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="h-8 w-8 text-success" />
              </div>
              <p className="text-2xl font-bold text-success">156h</p>
              <p className="text-sm text-muted-foreground">Total filming time</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <FileText className="h-8 w-8 text-warning" />
              </div>
              <p className="text-2xl font-bold text-warning">89</p>
              <p className="text-sm text-muted-foreground">Scenes completed</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <p className="text-2xl font-bold text-primary">24</p>
              <p className="text-sm text-muted-foreground">Crew members active</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;