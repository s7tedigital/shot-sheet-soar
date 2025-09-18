import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  FolderOpen, 
  Calendar, 
  Users, 
  FileText, 
  Menu,
  X,
  Film,
  Clapperboard
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/', icon: BarChart3 },
  { name: 'Projects', href: '/projects', icon: FolderOpen },
  { name: 'Stripboard', href: '/stripboard', icon: Calendar },
  { name: 'Crew', href: '/crew', icon: Users },
  { name: 'Reports', href: '/reports', icon: FileText },
];

export const Sidebar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  const SidebarContent = () => (
    <div className="flex h-full flex-col bg-card border-r border-border">
      {/* Logo */}
      <div className="flex h-16 items-center px-6 border-b border-border">
        <div className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-8 h-8 bg-gradient-primary rounded-lg">
            <Film className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-foreground">CineScheduler</span>
            <span className="text-xs text-muted-foreground">Pro</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200",
                "hover:bg-accent hover:text-accent-foreground",
                isActive 
                  ? "bg-primary text-primary-foreground shadow-md" 
                  : "text-muted-foreground"
              )}
              onClick={() => setIsMobileOpen(false)}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </NavLink>
          );
        })}
      </nav>

      {/* Recent Projects */}
      <div className="px-4 py-4 border-t border-border">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Recent Projects
        </h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2 px-2 py-1.5 rounded-md hover:bg-accent transition-colors">
            <Clapperboard className="h-4 w-4 text-primary" />
            <span className="text-xs text-foreground truncate">Independent Film 2024</span>
          </div>
          <div className="flex items-center space-x-2 px-2 py-1.5 rounded-md hover:bg-accent transition-colors">
            <Clapperboard className="h-4 w-4 text-warning" />
            <span className="text-xs text-foreground truncate">Web Series - Season 1</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsMobileOpen(true)}
          className="bg-card/95 backdrop-blur-sm border-border"
        >
          <Menu className="h-4 w-4" />
        </Button>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 z-40">
        <SidebarContent />
      </div>

      {/* Mobile sidebar overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-background/80 backdrop-blur-sm" 
            onClick={() => setIsMobileOpen(false)}
          />
          
          {/* Sidebar */}
          <div className="fixed inset-y-0 left-0 w-64 animate-slide-in-left">
            <SidebarContent />
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsMobileOpen(false)}
              className="absolute top-4 right-4"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
};