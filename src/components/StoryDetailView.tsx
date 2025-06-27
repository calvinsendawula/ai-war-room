
import React from 'react';
import { Clock, ExternalLink, TrendingUp, Users, Zap, History, Calendar, Globe, Eye } from 'lucide-react';
import { StoryCard as StoryCardType } from '@/types/dashboard';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface StoryDetailViewProps {
  story: StoryCardType | null;
  isOpen: boolean;
  onClose: () => void;
}

export const StoryDetailView: React.FC<StoryDetailViewProps> = ({ 
  story, 
  isOpen, 
  onClose 
}) => {
  if (!story) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'HIGH': return 'var(--dashboard-accent-high)';
      case 'MEDIUM': return 'var(--dashboard-accent-medium)';
      case 'EMERGING': return 'var(--dashboard-accent-low)';
      default: return 'var(--dashboard-accent-low)';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-4xl h-[80vh] overflow-y-auto"
        style={{ 
          backgroundColor: 'var(--dashboard-bg-card)',
          borderColor: 'var(--dashboard-border)',
          color: 'var(--dashboard-text-primary)'
        }}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold display-font mb-4">
            Story Analysis
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Importance Badge */}
          <div 
            className="inline-block px-4 py-2 rounded-lg font-semibold text-sm"
            style={{ 
              backgroundColor: `${getImportanceColor(story.importance)}20`,
              color: getImportanceColor(story.importance),
              border: `1px solid ${getImportanceColor(story.importance)}`
            }}
          >
            🔴 {story.importance} STRATEGIC IMPORTANCE
          </div>

          {/* Story Title */}
          <h1 
            className="text-3xl font-bold leading-tight display-font"
            style={{ color: 'var(--dashboard-text-primary)' }}
          >
            {story.title}
          </h1>

          {/* Publication Info */}
          <div className="flex items-center gap-4 text-sm" style={{ color: 'var(--dashboard-text-secondary)' }}>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(story.publishedAt)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Globe className="w-4 h-4" />
              <span>{story.sources.length} sources</span>
            </div>
            {story.score && (
              <div className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                <span>Score: {story.score}/100</span>
              </div>
            )}
          </div>

          {/* Strategic Takeaway */}
          <div 
            className="p-6 rounded-lg border-l-4"
            style={{ 
              backgroundColor: 'var(--dashboard-bg-secondary)',
              borderLeftColor: 'var(--dashboard-accent-blue)'
            }}
          >
            <h2 
              className="text-lg font-semibold mb-3 tracking-wide"
              style={{ color: 'var(--dashboard-accent-blue)' }}
            >
              STRATEGIC TAKEAWAY
            </h2>
            <p 
              className="text-base leading-relaxed body-font"
              style={{ color: 'var(--dashboard-text-primary)' }}
            >
              {story.strategicTakeaway}
            </p>
          </div>

          {/* Why This Matters Now */}
          <div 
            className="p-6 rounded-lg"
            style={{ backgroundColor: 'var(--dashboard-bg-secondary)' }}
          >
            <h2 
              className="text-lg font-semibold mb-3 tracking-wide"
              style={{ color: 'var(--dashboard-accent-blue)' }}
            >
              WHY THIS MATTERS NOW
            </h2>
            <p 
              className="text-base leading-relaxed body-font"
              style={{ color: 'var(--dashboard-text-primary)' }}
            >
              This development represents a critical inflection point in the AI infrastructure landscape. 
              The timing aligns with emerging hardware requirements for next-generation AI models, 
              suggesting a strategic pivot that could reshape competitive dynamics across the industry. 
              Key stakeholders should monitor follow-up moves and potential market reactions over the next 30-60 days.
            </p>
          </div>

          {/* Strategic Dimensions */}
          <div 
            className="p-6 rounded-lg"
            style={{ backgroundColor: 'var(--dashboard-bg-secondary)' }}
          >
            <h2 
              className="text-lg font-semibold mb-4 tracking-wide"
              style={{ color: 'var(--dashboard-accent-blue)' }}
            >
              STRATEGIC DIMENSIONS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 mt-1" style={{ color: 'var(--dashboard-accent-blue)' }} />
                <div>
                  <span className="font-semibold" style={{ color: 'var(--dashboard-text-primary)' }}>
                    IMPACT:
                  </span>
                  <p className="text-sm mt-1" style={{ color: 'var(--dashboard-text-secondary)' }}>
                    {story.strategicDimensions.impact}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 mt-1" style={{ color: 'var(--dashboard-accent-blue)' }} />
                <div>
                  <span className="font-semibold" style={{ color: 'var(--dashboard-text-primary)' }}>
                    TIMING:
                  </span>
                  <p className="text-sm mt-1" style={{ color: 'var(--dashboard-text-secondary)' }}>
                    {story.strategicDimensions.timing}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 mt-1" style={{ color: 'var(--dashboard-accent-blue)' }} />
                <div>
                  <span className="font-semibold" style={{ color: 'var(--dashboard-text-primary)' }}>
                    PLAYERS:
                  </span>
                  <p className="text-sm mt-1" style={{ color: 'var(--dashboard-text-secondary)' }}>
                    {story.strategicDimensions.players}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <History className="w-5 h-5 mt-1" style={{ color: 'var(--dashboard-accent-blue)' }} />
                <div>
                  <span className="font-semibold" style={{ color: 'var(--dashboard-text-primary)' }}>
                    PRECEDENT:
                  </span>
                  <p className="text-sm mt-1" style={{ color: 'var(--dashboard-text-secondary)' }}>
                    {story.strategicDimensions.precedent}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Connected Stories */}
          {story.connectedStories.length > 0 && (
            <div 
              className="p-6 rounded-lg"
              style={{ backgroundColor: 'var(--dashboard-bg-secondary)' }}
            >
              <h2 
                className="text-lg font-semibold mb-4 tracking-wide"
                style={{ color: 'var(--dashboard-accent-blue)' }}
              >
                CONNECTED DEVELOPMENTS
              </h2>
              <div className="space-y-3">
                {story.connectedStories.map((connected) => (
                  <div 
                    key={connected.id}
                    className="flex items-start gap-3 p-3 rounded cursor-pointer transition-colors duration-200"
                    style={{ backgroundColor: 'var(--dashboard-bg-card)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--dashboard-border)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--dashboard-bg-card)';
                    }}
                  >
                    <Zap className="w-4 h-4 mt-1" style={{ color: 'var(--dashboard-accent-blue)' }} />
                    <div className="flex-1">
                      <p className="font-medium" style={{ color: 'var(--dashboard-text-primary)' }}>
                        {connected.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm" style={{ color: 'var(--dashboard-text-secondary)' }}>
                          {connected.relativeTime}
                        </span>
                        <span className="text-xs mono-font" style={{ color: 'var(--dashboard-text-secondary)' }}>
                          ({connected.exactDate})
                        </span>
                        <span 
                          className={`text-xs px-2 py-1 rounded ${
                            connected.importance === 'HIGH' ? 'bg-red-900 text-red-200' :
                            connected.importance === 'MEDIUM' ? 'bg-yellow-900 text-yellow-200' :
                            'bg-green-900 text-green-200'
                          }`}
                        >
                          {connected.importance}
                        </span>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4" style={{ color: 'var(--dashboard-accent-blue)' }} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sources */}
          <div 
            className="p-6 rounded-lg"
            style={{ backgroundColor: 'var(--dashboard-bg-secondary)' }}
          >
            <h2 
              className="text-lg font-semibold mb-4 tracking-wide"
              style={{ color: 'var(--dashboard-accent-blue)' }}
            >
              SOURCES & REFERENCES
            </h2>
            <div className="space-y-4">
              {story.sources.map((source) => (
                <div 
                  key={source.id}
                  className="border rounded-lg p-4 cursor-pointer transition-colors duration-200"
                  style={{ 
                    borderColor: 'var(--dashboard-border)',
                    backgroundColor: 'var(--dashboard-bg-card)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--dashboard-accent-blue)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--dashboard-border)';
                  }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2" style={{ color: 'var(--dashboard-text-primary)' }}>
                        {source.name}
                      </h3>
                      <p className="text-sm mb-2" style={{ color: 'var(--dashboard-text-secondary)' }}>
                        {source.excerpt}
                      </p>
                      <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--dashboard-text-secondary)' }}>
                        <Clock className="w-3 h-3" />
                        <span>{formatDate(source.publishedAt)}</span>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--dashboard-accent-blue)' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
