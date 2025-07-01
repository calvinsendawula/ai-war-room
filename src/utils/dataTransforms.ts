import { 
  StoryCard, 
  StrategicThread, 
  DashboardStats, 
  StrategicDimensions,
  ConnectedStory,
  Source 
} from '@/types/dashboard';
import { 
  DashboardResponse, 
  ArticleDetailResponse,
  ArticleListResponse 
} from '@/services/api';

// Transform API story to StoryCard format
export function transformApiStoryToStoryCard(apiStory: DashboardResponse['top_stories'][0]): StoryCard {
  console.log('🔄 Transforming API story:', {
    id: apiStory.id,
    title: apiStory.title,
    importance_level: apiStory.importance_level,
    publish_date: apiStory.publish_date,
    strategic_takeaway: apiStory.strategic_takeaway,
    hasStrategicTakeaway: !!apiStory.strategic_takeaway
  });

  const strategicDimensions: StrategicDimensions = {
    impact: apiStory.impact_analysis || 'No impact analysis available',
    timing: apiStory.timing_analysis || 'No timing analysis available',
    players: apiStory.players_analysis || 'No players analysis available',
    precedent: apiStory.precedent_analysis || 'No precedent analysis available'
  };

  // For now, we'll need to handle connected stories and sources separately
  // since the API doesn't provide them in the dashboard endpoint
  const connectedStories: ConnectedStory[] = [];
  
  // Safely handle strategic_takeaway for excerpt
  const strategicTakeaway = apiStory.strategic_takeaway || 'No strategic takeaway available';
  const excerpt = strategicTakeaway.length > 100 
    ? strategicTakeaway.substring(0, 100) + '...'
    : strategicTakeaway;

  const sources: Source[] = [{
    id: apiStory.id,
    name: 'Strategic Analysis',
    url: apiStory.url || '#',
    excerpt: excerpt,
    publishedAt: apiStory.publish_date || new Date().toISOString()
  }];

  const transformedStory: StoryCard = {
    id: apiStory.id,
    title: apiStory.title || 'Untitled',
    importance: apiStory.importance_level || 'MEDIUM',
    strategicTakeaway: strategicTakeaway,
    strategicDimensions,
    connectedStories,
    sources,
    publishedAt: apiStory.publish_date || new Date().toISOString(),
    score: apiStory.importance_score || 0
  };

  console.log('✅ Successfully transformed story:', {
    id: transformedStory.id,
    title: transformedStory.title,
    hasStrategicTakeaway: !!transformedStory.strategicTakeaway
  });
  return transformedStory;
}

// Transform API strategic threads to StrategicThread format
export function transformApiThreadsToStrategicThreads(apiThreads: DashboardResponse['strategic_threads']): StrategicThread[] {
  console.log(`🔗 Transforming ${apiThreads.length} strategic threads`);

  if (!apiThreads || apiThreads.length === 0) {
    console.log('⚠️ No strategic threads to transform');
    return [];
  }

  const threadMap = new Map<string, {
    connections: DashboardResponse['strategic_threads'],
    storyIds: Set<string>
  }>();

  // Group threads by connection type or create logical groupings
  apiThreads.forEach((thread, index) => {
    const threadKey = thread.connection_type || `thread-${Math.floor(index / 3)}`;
    
    if (!threadMap.has(threadKey)) {
      threadMap.set(threadKey, {
        connections: [],
        storyIds: new Set()
      });
    }
    
    const threadData = threadMap.get(threadKey)!;
    threadData.connections.push(thread);
    // We'll use a hash of the titles as story IDs since we don't have them
    threadData.storyIds.add(hashString(thread.primary_title));
    threadData.storyIds.add(hashString(thread.connected_title));
  });

  const result = Array.from(threadMap.entries()).map(([key, data], index) => {
    const strength = data.connections.reduce((sum, conn) => sum + conn.relationship_strength, 0) / data.connections.length;
    
    return {
      id: key,
      title: data.connections[0]?.connection_type || `Strategic Thread ${index + 1}`,
      storyIds: Array.from(data.storyIds),
      timelineEvents: data.connections.map((conn, idx) => ({
        date: new Date(Date.now() - (idx * 24 * 60 * 60 * 1000)).toISOString(), // Mock dates
        event: `${conn.primary_title} connects to ${conn.connected_title}`,
        storyId: hashString(conn.primary_title)
      })),
      strength
    };
  });

  console.log(`✅ Transformed ${result.length} strategic threads`);
  return result;
}

// Transform processing status to dashboard stats
export function transformProcessingStatusToStats(
  processingStatus: DashboardResponse['processing_status'],
  recentAnalysis: DashboardResponse['recent_analysis']
): DashboardStats {
  console.log('📊 Transforming processing status to stats:', {
    active_sessions: processingStatus.active_sessions,
    articles_in_pipeline: processingStatus.articles_in_pipeline,
    recent_analysis_count: recentAnalysis.length
  });

  return {
    totalStoriesAnalyzed: recentAnalysis.length,
    sourcesMonitored: 156, // This would need to come from another API endpoint
    alertsCount: processingStatus.active_sessions,
    lastUpdateTime: new Date(processingStatus.last_update * 1000).toISOString()
  };
}

// Transform article detail response to StoryCard with full data
export function transformArticleDetailToStoryCard(apiArticle: ArticleDetailResponse): StoryCard {
  console.log('🔄 Transforming detailed article:', apiArticle.id);

  const strategicDimensions: StrategicDimensions = {
    impact: apiArticle.impact_analysis || 'No impact analysis available',
    timing: apiArticle.timing_analysis || 'No timing analysis available',
    players: apiArticle.players_analysis || 'No players analysis available',
    precedent: apiArticle.precedent_analysis || 'No precedent analysis available'
  };

  const connectedStories: ConnectedStory[] = (apiArticle.connections || []).map(conn => ({
    id: conn.connected_id,
    title: conn.connected_title,
    relativeTime: 'Recently', // Would need to calculate from dates
    exactDate: new Date().toISOString().split('T')[0], // Mock date
    importance: 'MEDIUM' as const // Would need to get from connection data
  }));

  // Safely handle strategic_takeaway for excerpt
  const strategicTakeaway = apiArticle.strategic_takeaway || 'No strategic takeaway available';
  const excerpt = strategicTakeaway.length > 100 
    ? strategicTakeaway.substring(0, 100) + '...'
    : strategicTakeaway;

  const sources: Source[] = [{
    id: apiArticle.id,
    name: 'Strategic Analysis',
    url: apiArticle.url || '#',
    excerpt: excerpt,
    publishedAt: apiArticle.publish_date || new Date().toISOString()
  }];

  return {
    id: apiArticle.id,
    title: apiArticle.title || 'Untitled',
    importance: apiArticle.importance_level || 'MEDIUM',
    strategicTakeaway: strategicTakeaway,
    strategicDimensions,
    connectedStories,
    sources,
    publishedAt: apiArticle.publish_date || new Date().toISOString(),
    score: apiArticle.importance_score || 0
  };
}

// Helper function to create consistent hash from string
function hashString(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash).toString();
} 