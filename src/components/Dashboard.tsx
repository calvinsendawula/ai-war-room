
import React, { useState, useEffect } from 'react';
import { DashboardHeader } from '@/components/DashboardHeader';
import { StoryCard } from '@/components/StoryCard';
import { StrategicThreads } from '@/components/StrategicThreads';
import { DashboardState } from '@/types/dashboard';
import { 
  mockStories, 
  mockStrategicThreads, 
  mockDashboardStats, 
  mockUserSettings 
} from '@/data/mockDashboardData';
import { toast } from '@/hooks/use-toast';

export const Dashboard: React.FC = () => {
  const [dashboardState, setDashboardState] = useState<DashboardState>({
    stories: [],
    connectedThreads: [],
    stats: mockDashboardStats,
    userSettings: mockUserSettings,
    loading: true,
    lastUpdated: new Date().toISOString(),
    error: undefined
  });

  // Simulate data loading
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setDashboardState(prev => ({ ...prev, loading: true }));
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setDashboardState(prev => ({
          ...prev,
          stories: mockStories.slice(0, prev.userSettings.topStoriesCount),
          connectedThreads: mockStrategicThreads,
          loading: false,
          lastUpdated: new Date().toISOString()
        }));

        toast({
          title: "Dashboard Updated",
          description: "Latest strategic intelligence loaded",
        });

      } catch (error) {
        console.error('Failed to load dashboard data:', error);
        setDashboardState(prev => ({
          ...prev,
          loading: false,
          error: 'Failed to load dashboard data'
        }));
      }
    };

    loadDashboardData();

    // Set up auto-refresh
    const refreshInterval = setInterval(() => {
      loadDashboardData();
    }, dashboardState.userSettings.refreshInterval * 60 * 1000);

    return () => clearInterval(refreshInterval);
  }, [dashboardState.userSettings.refreshInterval, dashboardState.userSettings.topStoriesCount]);

  const handleStoryClick = (storyId: string) => {
    console.log('Story clicked:', storyId);
    toast({
      title: "Story Detail View",
      description: "Full story analysis would open here",
    });
  };

  const handleThreadClick = (threadId: string) => {
    console.log('Thread clicked:', threadId);
    toast({
      title: "Strategic Thread",
      description: "Thread timeline would open here",
    });
  };

  const handleSettingsClick = () => {
    toast({
      title: "Settings",
      description: "Dashboard settings panel would open here",
    });
  };

  const handleLogout = () => {
    toast({
      title: "Logout",
      description: "User would be logged out",
    });
  };

  if (dashboardState.loading) {
    return (
      <div className="min-h-screen dashboard-theme">
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div 
              className="w-12 h-12 border-2 border-t-transparent rounded-full animate-spin mx-auto mb-4"
              style={{ borderColor: 'var(--dashboard-accent-blue)' }}
            />
            <p 
              className="text-lg font-semibold display-font"
              style={{ color: 'var(--dashboard-text-primary)' }}
            >
              Loading Strategic Intelligence...
            </p>
            <p 
              className="text-sm mt-2 mono-font"
              style={{ color: 'var(--dashboard-text-secondary)' }}
            >
              Analyzing {mockDashboardStats.totalStoriesAnalyzed.toLocaleString()} stories from {mockDashboardStats.sourcesMonitored} sources
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen dashboard-theme">
      <DashboardHeader 
        stats={dashboardState.stats}
        onSettingsClick={handleSettingsClick}
        onLogout={handleLogout}
      />
      
      <div className="flex h-[calc(100vh-80px)]">
        {/* Main Content Area */}
        <div className="flex-1 p-6 dashboard-scrollbar overflow-y-auto">
          <div className="mb-6">
            <h2 
              className="text-xl font-bold display-font mb-2"
              style={{ color: 'var(--dashboard-text-primary)' }}
            >
              Top Strategic Developments
            </h2>
            <p 
              className="text-sm body-font"
              style={{ color: 'var(--dashboard-text-secondary)' }}
            >
              {dashboardState.stories.length} high-impact stories ranked by strategic importance
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-1 xl:grid-cols-2">
            {dashboardState.stories.map((story) => (
              <StoryCard
                key={story.id}
                story={story}
                onClick={() => handleStoryClick(story.id)}
              />
            ))}
          </div>

          {dashboardState.stories.length === 0 && (
            <div 
              className="text-center py-12"
              style={{ color: 'var(--dashboard-text-secondary)' }}
            >
              <p className="text-lg font-semibold mb-2">No stories available</p>
              <p className="text-sm">Strategic intelligence will appear here as it becomes available</p>
            </div>
          )}
        </div>

        {/* Strategic Threads Sidebar */}
        <div className="w-80 flex-shrink-0">
          <StrategicThreads 
            threads={dashboardState.connectedThreads}
            onThreadClick={handleThreadClick}
          />
        </div>
      </div>
    </div>
  );
};
