import { StoryCard, StrategicThread, DashboardStats, UserSettings } from '@/types/dashboard';

export const mockStories: StoryCard[] = [
  {
    id: '1',
    title: 'OpenAI Acquires Leading Chip Design Team from Google',
    importance: 'HIGH',
    strategicTakeaway: 'This acquisition signals OpenAI\'s aggressive push toward vertical integration in AI hardware, potentially reducing dependency on NVIDIA while establishing a new competitive front in the AI infrastructure war. The timing suggests preparation for next-generation model requirements that current hardware cannot efficiently support.',
    strategicDimensions: {
      impact: 'Signals major shift to hardware vertical integration, threatens NVIDIA monopoly',
      timing: '3 months after Google TPU v5 announcement, ahead of GPT-5 rollout',
      players: 'OpenAI vs Google vs NVIDIA, involves ex-Apple silicon talent acquisition',
      precedent: 'Enables future custom silicon development, follows Tesla\'s FSD chip strategy'
    },
    connectedStories: [
      {
        id: '2',
        title: 'NVIDIA Export Restrictions Tighten',
        relativeTime: 'Yesterday',
        exactDate: 'June 26, 2025',
        importance: 'HIGH'
      },
      {
        id: '3', 
        title: 'Google TPU v5 Benchmarks Released',
        relativeTime: 'Last week',
        exactDate: 'June 20, 2025',
        importance: 'MEDIUM'
      }
    ],
    sources: [
      {
        id: '1',
        name: 'The Information',
        url: 'https://theinformation.com/openai-chip-team',
        excerpt: 'OpenAI has quietly assembled a team of chip designers...',
        publishedAt: '2025-06-27T08:00:00Z'
      },
      {
        id: '2',
        name: 'Reuters',
        url: 'https://reuters.com/tech/openai-google-talent',
        excerpt: 'Former Google engineers join OpenAI\'s hardware division...',
        publishedAt: '2025-06-27T09:15:00Z'
      },
      {
        id: '3',
        name: 'TechCrunch',
        url: 'https://techcrunch.com/openai-silicon-strategy',
        excerpt: 'The move represents a strategic shift toward hardware independence...',
        publishedAt: '2025-06-27T10:30:00Z'
      }
    ],
    publishedAt: '2025-06-27T08:00:00Z',
    score: 94
  },
  {
    id: '4',
    title: 'Anthropic Secures $15B Series D at $150B Valuation',
    importance: 'HIGH',
    strategicTakeaway: 'Anthropic\'s massive funding round at a $150B valuation establishes it as the clear #2 AI company globally, with sufficient capital to compete directly with OpenAI on model development and talent acquisition. The investor composition suggests strong backing for AGI development timelines.',
    strategicDimensions: {
      impact: 'Establishes clear AI duopoly, accelerates AGI development competition',
      timing: 'Before potential OpenAI IPO, during peak AI investment cycle',
      players: 'Google, Spark Capital, existing investors vs OpenAI backers',
      precedent: 'Largest AI funding round ever, validates $100B+ AI company valuations'
    },
    connectedStories: [
      {
        id: '5',
        title: 'OpenAI IPO Rumors Intensify',
        relativeTime: '2 days ago',
        exactDate: 'June 25, 2025',
        importance: 'HIGH'
      }
    ],
    sources: [
      {
        id: '4',
        name: 'Wall Street Journal',
        url: 'https://wsj.com/anthropic-funding',
        excerpt: 'Anthropic raised $15 billion in its Series D funding round...',
        publishedAt: '2025-06-27T07:00:00Z'
      },
      {
        id: '5',
        name: 'Bloomberg',
        url: 'https://bloomberg.com/anthropic-valuation',
        excerpt: 'The funding values Anthropic at $150 billion...',
        publishedAt: '2025-06-27T07:30:00Z'
      }
    ],
    publishedAt: '2025-06-27T07:00:00Z',
    score: 92
  },
  {
    id: '6',
    title: 'Meta Releases Llama 4 with 500B Parameters',
    importance: 'MEDIUM',
    strategicTakeaway: 'Meta\'s Llama 4 release maintains their open-source AI strategy while closing the capability gap with proprietary models. The 500B parameter scale suggests Meta is willing to invest heavily in compute to maintain competitive positioning in the open-source AI ecosystem.',
    strategicDimensions: {
      impact: 'Advances open-source AI capabilities, pressures proprietary model pricing',
      timing: 'Coincides with regulatory scrutiny of closed AI systems',
      players: 'Meta vs OpenAI/Anthropic closed models, benefits smaller players',
      precedent: 'Largest open-source model release, sets new scale expectations'
    },
    connectedStories: [
      {
        id: '7',
        title: 'EU AI Act Implementation Begins',
        relativeTime: '1 week ago',
        exactDate: 'June 20, 2025',
        importance: 'MEDIUM'
      }
    ],
    sources: [
      {
        id: '6',
        name: 'Meta AI Blog',
        url: 'https://ai.meta.com/llama-4-release',
        excerpt: 'Today we\'re releasing Llama 4, our most capable open model...',
        publishedAt: '2025-06-27T12:00:00Z'
      }
    ],
    publishedAt: '2025-06-27T12:00:00Z',
    score: 78
  },
  {
    id: '8',
    title: 'Chinese AI Startup Zhipu Raises $2B Series C',
    importance: 'EMERGING',
    strategicTakeaway: 'Zhipu\'s significant funding round indicates continued Chinese investment in AI despite export restrictions, potentially creating parallel AI development ecosystem. The timing suggests preparation for domestic AI model deployment at scale.',
    strategicDimensions: {
      impact: 'Strengthens Chinese AI capabilities independent of US technology',
      timing: 'Despite ongoing chip export restrictions and trade tensions',
      players: 'Chinese tech giants vs US AI companies, government backing evident',
      precedent: 'Largest Chinese AI startup funding this year, signals ecosystem maturity'
    },
    connectedStories: [],
    sources: [
      {
        id: '7',
        name: 'South China Morning Post',
        url: 'https://scmp.com/zhipu-funding',
        excerpt: 'Beijing-based AI startup Zhipu raised $2 billion...',
        publishedAt: '2025-06-27T06:00:00Z'
      }
    ],
    publishedAt: '2025-06-27T06:00:00Z',
    score: 65
  },
  {
    id: '9',
    title: 'Microsoft Announces Azure AI Infrastructure Expansion',
    importance: 'MEDIUM',
    strategicTakeaway: 'Microsoft\'s $10B infrastructure investment reinforces their position as the leading AI cloud provider, directly competing with Google Cloud and AWS for enterprise AI workloads. The geographic expansion targets markets where OpenAI partnership provides competitive advantage.',
    strategicDimensions: {
      impact: 'Strengthens cloud AI market leadership, pressures competitors',
      timing: 'Before enterprise budget cycles, ahead of OpenAI enterprise push',
      players: 'Microsoft vs Google Cloud vs AWS, leverages OpenAI partnership',
      precedent: 'Largest cloud AI infrastructure investment announcement'
    },
    connectedStories: [
      {
        id: '10',
        title: 'Google Cloud AI Revenue Surges 45%',
        relativeTime: '3 days ago',
        exactDate: 'June 24, 2025',
        importance: 'MEDIUM'
      }
    ],
    sources: [
      {
        id: '8',
        name: 'Microsoft Blog',
        url: 'https://microsoft.com/azure-ai-expansion',
        excerpt: 'We\'re investing $10 billion in Azure AI infrastructure...',
        publishedAt: '2025-06-27T11:00:00Z'
      }
    ],
    publishedAt: '2025-06-27T11:00:00Z',
    score: 72
  }
];

export const mockStrategicThreads: StrategicThread[] = [
  {
    id: 'thread-1',
    title: 'AI Hardware Independence Movement',
    storyIds: ['1', '2', '3'],
    timelineEvents: [
      {
        date: '2025-06-20T00:00:00Z',
        event: 'Google TPU v5 benchmarks released',
        storyId: '3'
      },
      {
        date: '2025-06-26T00:00:00Z',
        event: 'NVIDIA export restrictions tighten',
        storyId: '2'
      },
      {
        date: '2025-06-27T00:00:00Z',
        event: 'OpenAI acquires chip design team',
        storyId: '1'
      }
    ],
    strength: 0.9
  },
  {
    id: 'thread-2',
    title: 'AI Company Valuation Surge',
    storyIds: ['4', '5', '8'],
    timelineEvents: [
      {
        date: '2025-06-25T00:00:00Z',
        event: 'OpenAI IPO rumors intensify',
        storyId: '5'
      },
      {
        date: '2025-06-27T00:00:00Z',
        event: 'Anthropic raises $15B at $150B valuation',
        storyId: '4'
      },
      {
        date: '2025-06-27T00:00:00Z',
        event: 'Zhipu raises $2B Series C',
        storyId: '8'
      }
    ],
    strength: 0.7
  },
  {
    id: 'thread-3',
    title: 'Cloud AI Infrastructure Race',
    storyIds: ['9', '10'],
    timelineEvents: [
      {
        date: '2025-06-24T00:00:00Z',
        event: 'Google Cloud AI revenue surges 45%',
        storyId: '10'
      },
      {
        date: '2025-06-27T00:00:00Z',
        event: 'Microsoft announces $10B Azure AI expansion',
        storyId: '9'
      }
    ],
    strength: 0.6
  }
];

export const mockDashboardStats: DashboardStats = {
  totalStoriesAnalyzed: 1247,
  sourcesMonitored: 156,
  alertsCount: 3,
  lastUpdateTime: '2025-06-27T14:30:00Z'
};

export const mockUserSettings = {
  topStoriesCount: 5,
  refreshInterval: 15,
  morningFeedHour: 7,
  eveningFeedHour: 16
};
