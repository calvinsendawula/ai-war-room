import { useState, useEffect } from 'react';
import { DashboardState, UserSettings } from '@/types/dashboard';
import { apiService } from '@/services/api';
import { 
  transformApiStoryToStoryCard, 
  transformApiThreadsToStrategicThreads, 
  transformProcessingStatusToStats 
} from '@/utils/dataTransforms';
import { toast } from '@/hooks/use-toast';

interface UseDashboardDataReturn {
  dashboardState: DashboardState;
  setDashboardState: React.Dispatch<React.SetStateAction<DashboardState>>;
  refreshDashboard: () => Promise<void>;
  updateUserSettings: (settings: UserSettings) => void;
}

export function useDashboardData(userSettings: UserSettings): UseDashboardDataReturn {
  const [dashboardState, setDashboardState] = useState<DashboardState>({
    stories: [],
    connectedThreads: [],
    stats: {
      totalStoriesAnalyzed: 0,
      sourcesMonitored: 0,
      alertsCount: 0,
      lastUpdateTime: new Date().toISOString()
    },
    userSettings,
    loading: true,
    lastUpdated: new Date().toISOString(),
    error: undefined
  });

  const loadDashboardData = async () => {
    try {
      console.log('🔄 Loading dashboard data...');
      setDashboardState(prev => ({ ...prev, loading: true }));
      
      // Fetch dashboard data from API
      const dashboardData = await apiService.getDashboardData();
      console.log('📊 Raw dashboard data received:', dashboardData);
      
      // Check if we have top_stories
      if (!dashboardData.top_stories || dashboardData.top_stories.length === 0) {
        console.warn('⚠️ No top_stories in API response');
        toast({
          title: "No Stories Available",
          description: "No strategic stories are currently available in the system",
        });
      } else {
        console.log(`📈 Found ${dashboardData.top_stories.length} top stories`);
      }
      
      // Transform API data to dashboard format
      const stories = dashboardData.top_stories
        .slice(0, userSettings.topStoriesCount)
        .map((story, index) => {
          console.log(`🔄 Transforming story ${index + 1}:`, story.title);
          return transformApiStoryToStoryCard(story);
        });
      
      console.log(`✅ Transformed ${stories.length} stories for display`);
      
      const connectedThreads = transformApiThreadsToStrategicThreads(dashboardData.strategic_threads || []);
      console.log(`🔗 Created ${connectedThreads.length} strategic threads`);
      
      const stats = transformProcessingStatusToStats(
        dashboardData.processing_status,
        dashboardData.recent_analysis || []
      );
      console.log('📈 Dashboard stats:', stats);
      
      setDashboardState(prev => ({
        ...prev,
        stories,
        connectedThreads,
        stats,
        loading: false,
        lastUpdated: new Date().toISOString(),
        error: undefined
      }));

      toast({
        title: "Dashboard Updated",
        description: `Loaded ${stories.length} strategic stories`,
      });

    } catch (error) {
      console.error('❌ Failed to load dashboard data:', error);
      
      // Log more details about the error
      if (error instanceof Error) {
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
      }
      
      setDashboardState(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to load dashboard data'
      }));
      
      toast({
        title: "Error Loading Data",
        description: `Failed to load dashboard data: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive"
      });
    }
  };

  const refreshDashboard = async () => {
    console.log('🔄 Manual dashboard refresh triggered');
    await loadDashboardData();
  };

  const updateUserSettings = (settings: UserSettings) => {
    console.log('⚙️ Updating user settings:', settings);
    setDashboardState(prev => ({
      ...prev,
      userSettings: settings
    }));
  };

  // Initial load and periodic refresh
  useEffect(() => {
    console.log('🚀 Dashboard hook initializing...');
    loadDashboardData();

    const refreshInterval = setInterval(() => {
      console.log('⏰ Periodic refresh triggered');
      loadDashboardData();
    }, userSettings.refreshInterval * 60 * 1000);

    return () => {
      console.log('🧹 Cleaning up dashboard hook');
      clearInterval(refreshInterval);
    };
  }, [userSettings.refreshInterval, userSettings.topStoriesCount]);

  return {
    dashboardState,
    setDashboardState,
    refreshDashboard,
    updateUserSettings
  };
} 