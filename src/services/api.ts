const BASE_URL = import.meta.env.VITE_BACKEND_URL;

if (!BASE_URL) {
  throw new Error('VITE_BACKEND_URL environment variable is not defined');
}

console.log('🌐 API Service initialized with base URL:', BASE_URL);

// API Response Types based on the specification
export interface DashboardResponse {
  top_stories: Array<{
    id: string;
    title: string;
    content: string;
    url: string;
    strategic_takeaway: string;
    importance_score: number;
    impact_analysis: string;
    timing_analysis: string;
    players_analysis: string;
    precedent_analysis: string;
    category_name: string;
    publish_date: string;
    importance_level: "HIGH" | "MEDIUM" | "EMERGING";
  }>;
  strategic_threads: Array<{
    primary_title: string;
    connected_title: string;
    relationship_strength: number;
    connection_type: string;
    primary_takeaway: string;
    connected_takeaway: string;
  }>;
  recent_analysis: Array<{
    id: string;
    title: string;
    importance_level: string;
    analyzed_at: string;
    importance_score: number;
    category_name: string;
  }>;
  processing_status: {
    active_sessions: number;
    articles_in_pipeline: number;
    last_update: number;
  };
}

export interface ArticleListResponse {
  articles: Array<{
    id: string;
    title: string;
    content: string;
    url: string;
    strategic_takeaway: string;
    importance_score: number;
    impact_analysis: string;
    timing_analysis: string;
    players_analysis: string;
    precedent_analysis: string;
    category_name: string;
    category_color: string;
    publish_date: string;
    importance_level: "HIGH" | "MEDIUM" | "EMERGING";
    connection_count: number;
  }>;
  total: number;
}

export interface ArticleDetailResponse {
  id: string;
  title: string;
  content: string;
  url: string;
  strategic_takeaway: string;
  importance_score: number;
  impact_analysis: string;
  timing_analysis: string;
  players_analysis: string;
  precedent_analysis: string;
  analyzed_at: string;
  category_name: string;
  category_color: string;
  publish_date: string;
  importance_level: "HIGH" | "MEDIUM" | "EMERGING";
  connections: Array<{
    connected_title: string;
    connected_id: string;
    relationship_strength: number;
    connection_type: string;
    connected_takeaway: string;
  }>;
}

export interface CategoriesResponse {
  categories: Array<{
    id: string;
    name: string;
    description: string;
    color_code: string;
    weight: number;
    article_count: number;
    avg_importance: number;
    priority_order: number;
  }>;
}

export interface ProcessingStatusResponse {
  session_id: string;
  stage: "collection" | "summary" | "filter" | "analysis" | "complete";
  progress_percent: number;
  current_article_count: number;
  total_articles: number;
  started_at: string;
  estimated_completion: string;
  completed_at?: string;
  errors: Array<any>;
}

export interface ArticleConnectionsResponse {
  article_id: string;
  connections: Array<{
    source_article_id: string;
    target_article_id: string;
    type: string;
    confidence: number;
    description: string;
  }>;
}

// API Service Functions
class ApiService {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${BASE_URL}${endpoint}`;
    
    console.log(`🌐 Making API request to: ${url}`);
    
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      });

      console.log(`📡 Response status: ${response.status} ${response.statusText}`);

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`❌ HTTP error ${response.status}:`, errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      // Get the response text first to debug what we're receiving
      const responseText = await response.text();
      console.log(`📄 Raw response text (first 500 chars):`, responseText.substring(0, 500));
      
      // Check if response looks like HTML
      if (responseText.trim().startsWith('<!DOCTYPE') || responseText.trim().startsWith('<html')) {
        console.error(`❌ Received HTML instead of JSON from ${endpoint}`);
        console.error(`🔍 Full HTML response:`, responseText);
        throw new Error(`API endpoint returned HTML instead of JSON. This usually means the endpoint doesn't exist or there's a routing issue.`);
      }

      try {
        const data = JSON.parse(responseText);
        console.log(`✅ API response data:`, data);
        return data;
      } catch (parseError) {
        console.error(`❌ Failed to parse JSON response:`, parseError);
        console.error(`🔍 Raw response that failed to parse:`, responseText);
        throw new Error(`Invalid JSON response from API: ${parseError.message}`);
      }
    } catch (error) {
      console.error(`❌ API request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  // Dashboard Data
  async getDashboardData(): Promise<DashboardResponse> {
    console.log('📊 Fetching dashboard data...');
    return this.request<DashboardResponse>('/api/dashboard');
  }

  // Article Listings
  async getArticles(params?: {
    importance?: 'HIGH' | 'MEDIUM' | 'EMERGING';
    category?: string;
    status?: 'analyzed' | 'collected' | 'approved';
    limit?: number;
    offset?: number;
  }): Promise<ArticleListResponse> {
    const searchParams = new URLSearchParams();
    
    if (params?.importance) searchParams.append('importance', params.importance);
    if (params?.category) searchParams.append('category', params.category);
    if (params?.status) searchParams.append('status', params.status);
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    if (params?.offset) searchParams.append('offset', params.offset.toString());

    const query = searchParams.toString();
    const endpoint = `/api/articles${query ? `?${query}` : ''}`;
    
    console.log('📰 Fetching articles with params:', params);
    return this.request<ArticleListResponse>(endpoint);
  }

  // Article Detail
  async getArticleDetail(articleId: string): Promise<ArticleDetailResponse> {
    console.log(`📖 Fetching article detail for ID: ${articleId}`);
    return this.request<ArticleDetailResponse>(`/api/articles/${articleId}`);
  }

  // Strategic Categories
  async getCategories(): Promise<CategoriesResponse> {
    console.log('🏷️ Fetching categories...');
    return this.request<CategoriesResponse>('/api/categories');
  }

  // Processing Status
  async getProcessingStatus(sessionId?: string): Promise<ProcessingStatusResponse> {
    const endpoint = `/api/processing/status${sessionId ? `?session_id=${sessionId}` : ''}`;
    console.log('⚙️ Fetching processing status...');
    return this.request<ProcessingStatusResponse>(endpoint);
  }

  // Article Connections
  async getArticleConnections(articleId: string): Promise<ArticleConnectionsResponse> {
    console.log(`🔗 Fetching connections for article: ${articleId}`);
    return this.request<ArticleConnectionsResponse>(`/api/stories/connections/${articleId}`);
  }
}

export const apiService = new ApiService(); 