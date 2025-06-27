
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { DashboardHeader } from '@/components/DashboardHeader';
import { StoryCard } from '@/components/StoryCard';
import { StrategicThreads } from '@/components/StrategicThreads';
import { StoryDetailView } from '@/components/StoryDetailView';
import { StrategicConnectionsView } from '@/components/StrategicConnectionsView';
import { TimelineView } from '@/components/TimelineView';
import { StrategicThreadDetailView } from '@/components/StrategicThreadDetailView';
import { DateTimeFilter } from '@/components/DateTimeFilter';
import { DashboardSettings } from '@/components/DashboardSettings';
import { DashboardState, StoryCard as StoryCardType, StrategicThread, UserSettings } from '@/types/dashboard';
import { 
  mockStories, 
  mockStrategicThreads, 
  mockDashboardStats, 
  mockUserSettings 
} from '@/data/mockDashboardData';
import { toast } from '@/hooks/use-toast';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [dashboardState, setDashboardState] = useState<DashboardState>({
    stories: [],
    connectedThreads: [],
    stats: mockDashboardStats,
    userSettings: mockUserSettings,
    loading: true,
    lastUpdated: new Date().toISOString(),
    error: undefined
  });

  // Modal states
  const [selectedStory, setSelectedStory] = useState<StoryCardType | null>(null);
  const [selectedThread, setSelectedThread] = useState<StrategicThread | null>(null);
  const [showStoryDetail, setShowStoryDetail] = useState(false);
  const [showConnectionsView, setShowConnectionsView] = useState(false);
  const [showTimelineView, setShowTimelineView] = useState(false);
  const [showThreadDetail, setShowThreadDetail] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Date/Time filter state
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedTime, setSelectedTime] = useState<'7am' | '4pm' | string>('4pm');
  const [canRefresh, setCanRefresh] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefreshTime, setLastRefreshTime] = useState<Date | null>(null);

  // Check authentication
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          navigate('/landing');
          return;
        }
        setUser(session.user);
        
        // Mock user profile data (in real app, fetch from profiles table)
        setUserProfile({
          first_name: session.user.user_metadata?.first_name || 'User',
          last_name: session.user.user_metadata?.last_name || ''
        });
      } catch (error) {
        console.error('Auth check failed:', error);
        navigate('/landing');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_OUT' || !session) {
          navigate('/landing');
        } else {
          setUser(session.user);
          setUserProfile({
            first_name: session.user.user_metadata?.first_name || 'User',
            last_name: session.user.user_metadata?.last_name || ''
          });
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate]);

  // Simulate data loading
  useEffect(() => {
    if (!user) return;

    const loadDashboardData = async () => {
      try {
        setDashboardState(prev => ({ ...prev, loading: true }));
        
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

    const refreshInterval = setInterval(() => {
      loadDashboardData();
    }, dashboardState.userSettings.refreshInterval * 60 * 1000);

    return () => clearInterval(refreshInterval);
  }, [user, dashboardState.userSettings.refreshInterval, dashboardState.userSettings.topStoriesCount]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const handleStoryClick = (storyId: string) => {
    console.log('Story clicked:', storyId);
    const story = dashboardState.stories.find(s => s.id === storyId);
    if (story) {
      setSelectedStory(story);
      setShowStoryDetail(true);
    }
  };

  const handleThreadClick = (threadId: string) => {
    console.log('Thread clicked:', threadId);
    const thread = dashboardState.connectedThreads.find(t => t.id === threadId);
    if (thread) {
      setSelectedThread(thread);
      setShowThreadDetail(true);
    }
  };

  const handleViewAllConnections = () => {
    console.log('View all connections clicked');
    setShowConnectionsView(true);
  };

  const handleTimelineView = () => {
    console.log('Timeline view clicked');
    setShowTimelineView(true);
  };

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    toast({
      title: "Date Updated",
      description: `Viewing intelligence for ${new Date(date).toLocaleDateString('en-US', { 
        month: 'long', 
        day: 'numeric',
        year: 'numeric'
      })}`,
    });
  };

  const handleTimeChange = (time: '7am' | '4pm' | string) => {
    setSelectedTime(time);
    toast({
      title: "Time Updated",
      description: `Viewing ${time.toUpperCase()} intelligence briefing`,
    });
  };

  const handleManualRefresh = () => {
    if (!canRefresh) {
      toast({
        title: "Refresh Unavailable",
        description: "Manual refresh can only be used once per 24-hour period",
        variant: "destructive"
      });
      return;
    }

    // Show confirmation toast with action
    toast({
      title: "Confirm Manual Refresh",
      description: "This will use your once-daily manual refresh. Are you sure?",
      action: (
        <button
          onClick={startManualRefresh}
          className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
        >
          Yes, Refresh
        </button>
      ),
    });
  };

  const startManualRefresh = () => {
    setCanRefresh(false);
    setIsRefreshing(true);
    setLastRefreshTime(new Date());
    
    const currentTime = new Date();
    const customTime = `${currentTime.getHours() > 12 ? currentTime.getHours() - 12 : currentTime.getHours()}${currentTime.getHours() >= 12 ? 'pm' : 'am'}`;
    
    toast({
      title: "Manual Refresh Started",
      description: "Pulling new intelligence data. You'll receive an email when complete.",
    });

    // Simulate refresh process
    setTimeout(() => {
      setIsRefreshing(false);
      setSelectedTime(customTime);
      
      toast({
        title: "Refresh Complete",
        description: `New intelligence briefing available for ${customTime}`,
      });
      
      // Simulate email notification (in real app, this would be handled by backend)
      console.log('Email notification sent: Manual refresh complete');
    }, 5000);

    // Reset refresh capability after 24 hours
    setTimeout(() => {
      setCanRefresh(true);
      setLastRefreshTime(null);
    }, 24 * 60 * 60 * 1000);
  };

  const handleSettingsClick = () => {
    setShowSettings(true);
  };

  const handleSettingsUpdate = (newSettings: UserSettings) => {
    setDashboardState(prev => ({
      ...prev,
      userSettings: newSettings
    }));
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out",
      });
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: "Logout Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive"
      });
    }
  };

  if (loading) {
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
          </div>
        </div>
      </div>
    );
  }

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
          {/* User Greeting */}
          {userProfile && (
            <div className="mb-4">
              <h1 
                className="text-xl font-semibold display-font"
                style={{ color: 'var(--dashboard-text-primary)' }}
              >
                {getGreeting()}, {userProfile.first_name}
              </h1>
            </div>
          )}

          {/* Date/Time Filter */}
          <div className="mb-6">
            <DateTimeFilter
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              onDateChange={handleDateChange}
              onTimeChange={handleTimeChange}
              onManualRefresh={handleManualRefresh}
              canRefresh={canRefresh}
              isRefreshing={isRefreshing}
            />
          </div>

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
              {dashboardState.stories.length} high-impact stories for {selectedDate === new Date().toISOString().split('T')[0] ? 'today' : new Date(selectedDate).toLocaleDateString()} • {selectedTime.toUpperCase()} briefing
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
            onViewAllConnections={handleViewAllConnections}
            onTimelineView={handleTimelineView}
          />
        </div>
      </div>

      {/* Modals */}
      <StoryDetailView
        story={selectedStory}
        isOpen={showStoryDetail}
        onClose={() => {
          setShowStoryDetail(false);
          setSelectedStory(null);
        }}
      />

      <StrategicThreadDetailView
        thread={selectedThread}
        isOpen={showThreadDetail}
        onClose={() => {
          setShowThreadDetail(false);
          setSelectedThread(null);
        }}
      />

      <StrategicConnectionsView
        threads={dashboardState.connectedThreads}
        isOpen={showConnectionsView}
        onClose={() => setShowConnectionsView(false)}
      />

      <TimelineView
        threads={dashboardState.connectedThreads}
        stories={dashboardState.stories}
        isOpen={showTimelineView}
        onClose={() => setShowTimelineView(false)}
      />

      <DashboardSettings
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        settings={dashboardState.userSettings}
        onSettingsUpdate={handleSettingsUpdate}
      />
    </div>
  );
};
