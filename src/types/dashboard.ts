// Strategic AI Intelligence Dashboard Types

export type ImportanceLevel = 'HIGH' | 'MEDIUM' | 'EMERGING';

export interface StrategicDimensions {
  impact: string;
  timing: string;
  players: string;
  precedent: string;
}

export interface ConnectedStory {
  id: string;
  title: string;
  relativeTime: string;
  exactDate: string;
  importance: ImportanceLevel;
}

export interface Source {
  id: string;
  name: string;
  url: string;
  excerpt: string;
  publishedAt: string;
}

export interface StoryCard {
  id: string;
  title: string;
  importance: ImportanceLevel;
  strategicTakeaway: string;
  strategicDimensions: StrategicDimensions;
  connectedStories: ConnectedStory[];
  sources: Source[];
  publishedAt: string;
  score?: number;
}

export interface StrategicThread {
  id: string;
  title: string;
  storyIds: string[];
  timelineEvents: Array<{
    date: string;
    event: string;
    storyId: string;
  }>;
  strength: number; // 0-1 connection strength
}

export interface DashboardStats {
  totalStoriesAnalyzed: number;
  sourcesMonitored: number;
  alertsCount: number;
  lastUpdateTime: string;
}

export interface UserSettings {
  topStoriesCount: number; // 3, 5, or 10
  refreshInterval: number; // minutes
  morningFeedHour: number;
  eveningFeedHour: number;
}

export interface DashboardState {
  stories: StoryCard[];
  connectedThreads: StrategicThread[];
  stats: DashboardStats;
  userSettings: UserSettings;
  loading: boolean;
  lastUpdated: string;
  error?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  settings: UserSettings;
}
