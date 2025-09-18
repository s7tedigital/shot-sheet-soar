export type ProjectStatus = 'in-production' | 'pre-production' | 'post-production' | 'completed' | 'paused';

export type SceneStatus = 'completed' | 'in-progress' | 'not-filmed' | 'review';

export interface Project {
  id: string;
  title: string;
  description: string;
  status: ProjectStatus;
  progress: number;
  startDate: string;
  endDate: string;
  director: string;
  budget: number;
  crew: string[];
  scenes: Scene[];
  thumbnail?: string;
}

export interface Scene {
  id: string;
  projectId: string;
  number: string;
  title: string;
  description: string;
  location: string;
  timeOfDay: 'day' | 'night' | 'dawn' | 'dusk' | 'interior';
  duration: number; // in minutes
  pages: number;
  cast: string[];
  equipment: string[];
  status: SceneStatus;
  notes?: string;
}

export interface CrewActivity {
  id: string;
  memberName: string;
  action: string;
  projectTitle: string;
  timestamp: string;
  avatar?: string;
}

// Mock Projects Data
export const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Independent Film 2024',
    description: 'An urban drama exploring modern relationships and social dynamics in the city.',
    status: 'in-production',
    progress: 65,
    startDate: '2024-01-15',
    endDate: '2024-04-30',
    director: 'Sarah Martinez',
    budget: 850000,
    crew: ['John Doe (Cinematographer)', 'Lisa Chen (Producer)', 'Mike Wilson (Sound)'],
    scenes: [],
    thumbnail: '/project-thumbnails/indie-film.jpg'
  },
  {
    id: '2',
    title: 'Web Series - Season 1',
    description: 'A comedy series following the adventures of a startup team in Silicon Valley.',
    status: 'pre-production',
    progress: 30,
    startDate: '2024-03-01',
    endDate: '2024-07-15',
    director: 'Alex Rodriguez',
    budget: 420000,
    crew: ['Emma Thompson (Producer)', 'David Kim (Writer)', 'Sarah Lee (Casting)'],
    scenes: [],
    thumbnail: '/project-thumbnails/web-series.jpg'
  },
  {
    id: '3',
    title: 'Brand X Commercial',
    description: 'High-end commercial showcasing the new luxury car line with dynamic action sequences.',
    status: 'post-production',
    progress: 90,
    startDate: '2023-11-20',
    endDate: '2024-02-10',
    director: 'Marcus Johnson',
    budget: 1200000,
    crew: ['Rachel Green (Editor)', 'Tom Anderson (VFX Supervisor)', 'Nina Patel (Color Grading)'],
    scenes: [],
    thumbnail: '/project-thumbnails/commercial.jpg'
  },
  {
    id: '4',
    title: 'Local Documentary',
    description: 'A heartwarming documentary about community resilience and local heroes.',
    status: 'completed',
    progress: 100,
    startDate: '2023-08-01',
    endDate: '2023-12-15',
    director: 'Jennifer Wu',
    budget: 180000,
    crew: ['Carlos Mendez (Camera)', 'Amy Foster (Editor)', 'Brian Clark (Audio)'],
    scenes: [],
    thumbnail: '/project-thumbnails/documentary.jpg'
  },
  {
    id: '5',
    title: 'Experimental Short',
    description: 'An innovative short film experimenting with new filming techniques and visual storytelling.',
    status: 'paused',
    progress: 20,
    startDate: '2024-02-01',
    endDate: '2024-05-30',
    director: 'Maya Patel',
    budget: 75000,
    crew: ['Chris Taylor (Experimental Tech)', 'Zoe Williams (Art Director)'],
    scenes: [],
    thumbnail: '/project-thumbnails/experimental.jpg'
  }
];

// Mock Scenes for Stripboard
export const mockScenes: Scene[] = [
  {
    id: 'scene-1',
    projectId: '1',
    number: '1A',
    title: 'Opening Coffee Shop',
    description: 'Main character meets love interest in busy coffee shop during morning rush.',
    location: 'Downtown Coffee Shop',
    timeOfDay: 'day',
    duration: 15,
    pages: 2.5,
    cast: ['Sarah Martinez', 'John Doe', 'Background Actors (20)'],
    equipment: ['Camera A', 'Steadicam', 'Audio Kit 1', 'Lighting Package'],
    status: 'completed',
    notes: 'Great performance, captured in 3 takes'
  },
  {
    id: 'scene-2',
    projectId: '1',
    number: '2B',
    title: 'Apartment Conversation',
    description: 'Intimate dialogue scene between roommates discussing relationship dynamics.',
    location: 'Sarah\'s Apartment Set',
    timeOfDay: 'interior',
    duration: 20,
    pages: 4.0,
    cast: ['Sarah Martinez', 'Lisa Chen'],
    equipment: ['Camera B', 'Audio Kit 2', 'Key Light', 'Fill Light'],
    status: 'in-progress',
    notes: 'Need pickup shots for close-ups'
  },
  {
    id: 'scene-3',
    projectId: '1',
    number: '3C',
    title: 'City Street Chase',
    description: 'High-energy sequence where protagonist chases after a mysterious figure.',
    location: '5th Avenue',
    timeOfDay: 'night',
    duration: 25,
    pages: 3.0,
    cast: ['John Doe', 'Stunt Double', 'Background Actors (15)'],
    equipment: ['Camera A', 'Camera B', 'Drone', 'Safety Equipment', 'Street Lighting'],
    status: 'not-filmed',
    notes: 'Permits required for night shooting'
  },
  {
    id: 'scene-4',
    projectId: '1',
    number: '4A',
    title: 'Rooftop Revelation',
    description: 'Emotional climax where truth is revealed against the city skyline.',
    location: 'Downtown Rooftop',
    timeOfDay: 'dusk',
    duration: 18,
    pages: 3.5,
    cast: ['Sarah Martinez', 'Mike Wilson'],
    equipment: ['Camera A', 'Stabilizer', 'Wind Protection', 'Safety Harnesses'],
    status: 'review',
    notes: 'Footage needs color correction review'
  },
  {
    id: 'scene-5',
    projectId: '2',
    number: '1A',
    title: 'Office Opening',
    description: 'Chaotic morning in the startup office with comedic mishaps.',
    location: 'Office Set - Stage 2',
    timeOfDay: 'interior',
    duration: 12,
    pages: 2.0,
    cast: ['Alex Rodriguez', 'Emma Thompson', 'David Kim', 'Office Extras (8)'],
    equipment: ['Multi-Camera Setup', 'Audio Kit 1', 'Practical Lights'],
    status: 'completed',
    notes: 'Great comedic timing achieved'
  },
  {
    id: 'scene-6',
    projectId: '2',
    number: '2B',
    title: 'Pitch Meeting Disaster',
    description: 'Important investor meeting goes hilariously wrong with tech failures.',
    location: 'Conference Room Set',
    timeOfDay: 'interior',
    duration: 22,
    pages: 4.5,
    cast: ['Sarah Lee', 'David Kim', 'Guest Actor (Investor)'],
    equipment: ['Camera A', 'Camera B', 'Lapel Mics', 'Practical Screen Effects'],
    status: 'in-progress',
    notes: 'Need to reshoot tech failure sequence'
  }
];

// Mock Crew Activities
export const mockCrewActivities: CrewActivity[] = [
  {
    id: '1',
    memberName: 'Sarah Martinez',
    action: 'completed Scene 1A',
    projectTitle: 'Independent Film 2024',
    timestamp: '2024-01-18T10:30:00Z'
  },
  {
    id: '2',
    memberName: 'John Doe',
    action: 'updated equipment list for Scene 3C',
    projectTitle: 'Independent Film 2024',
    timestamp: '2024-01-18T09:45:00Z'
  },
  {
    id: '3',
    memberName: 'Alex Rodriguez',
    action: 'approved final cut of Scene 1A',
    projectTitle: 'Web Series - Season 1',
    timestamp: '2024-01-18T09:15:00Z'
  },
  {
    id: '4',
    memberName: 'Marcus Johnson',
    action: 'added color grading notes',
    projectTitle: 'Brand X Commercial',
    timestamp: '2024-01-18T08:30:00Z'
  },
  {
    id: '5',
    memberName: 'Lisa Chen',
    action: 'scheduled cast meeting for tomorrow',
    projectTitle: 'Independent Film 2024',
    timestamp: '2024-01-17T16:20:00Z'
  }
];

// Dashboard Statistics
export const getDashboardStats = () => {
  const totalProjects = mockProjects.length;
  const activeProjects = mockProjects.filter(p => 
    p.status === 'in-production' || p.status === 'pre-production'
  ).length;
  const totalScenes = mockScenes.length;
  const shotScenes = mockScenes.filter(s => s.status === 'completed').length;
  const totalBudget = mockProjects.reduce((sum, project) => sum + project.budget, 0);

  return {
    totalProjects,
    activeProjects,
    shotScenes,
    totalScenes,
    totalBudget
  };
};

// Weekly Progress Data for Charts
export const weeklyProgressData = [
  { week: 'Week 1', progress: 15, planned: 20 },
  { week: 'Week 2', progress: 28, planned: 35 },
  { week: 'Week 3', progress: 45, planned: 50 },
  { week: 'Week 4', progress: 62, planned: 65 },
  { week: 'Week 5', progress: 78, planned: 80 },
  { week: 'Week 6', progress: 85, planned: 95 },
];