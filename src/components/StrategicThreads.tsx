import React from 'react';
import { TrendingUp, Clock, Zap, ExternalLink } from 'lucide-react';
import { StrategicThread } from '@/types/dashboard';

interface StrategicThreadsProps {
  threads: StrategicThread[];
  onThreadClick: (threadId: string) => void;
  onViewAllConnections: () => void;
  onTimelineView: () => void;
}

export const StrategicThreads: React.FC<StrategicThreadsProps> = ({
  threads,
  onThreadClick,
  onViewAllConnections,
  onTimelineView
}) => {
  const getStrengthColor = (strength: number) => {
    if (strength >= 0.8) return 'var(--dashboard-accent-high)';
    if (strength >= 0.6) return 'var(--dashboard-accent-medium)';
    return 'var(--dashboard-accent-low)';
  };

  const getStrengthLabel = (strength: number) => {
    if (strength >= 0.8) return 'STRONG';
    if (strength >= 0.6) return 'MODERATE';
    return 'WEAK';
  };

  return (
    <div 
      className="h-full p-4 border-l dashboard-scrollbar overflow-y-auto"
      style={{ 
        backgroundColor: 'var(--dashboard-bg-secondary)',
        borderColor: 'var(--dashboard-border)'
      }}
    >
      <div className="mb-6">
        <h2 
          className="text-lg font-bold display-font mb-2"
          style={{ color: 'var(--dashboard-text-primary)' }}
        >
          Strategic Threads
        </h2>
        <p 
          className="text-sm body-font"
          style={{ color: 'var(--dashboard-text-secondary)' }}
        >
          Connected developments and emerging patterns
        </p>
      </div>

      <div className="space-y-4">
        {threads.map((thread) => (
          <div
            key={thread.id}
            className="dashboard-card rounded-lg p-4 cursor-pointer transition-all duration-200 hover:scale-[1.02]"
            onClick={() => onThreadClick(thread.id)}
          >
            {/* Thread Header */}
            <div className="flex items-start justify-between mb-3">
              <h3 
                className="text-sm font-semibold leading-tight flex-1 mr-2"
                style={{ color: 'var(--dashboard-text-primary)' }}
              >
                {thread.title}
              </h3>
              <div 
                className="text-xs mono-font px-2 py-1 rounded border"
                style={{ 
                  color: getStrengthColor(thread.strength),
                  borderColor: getStrengthColor(thread.strength),
                  backgroundColor: `${getStrengthColor(thread.strength)}20`
                }}
              >
                {getStrengthLabel(thread.strength)}
              </div>
            </div>

            {/* Connection Strength Indicator */}
            <div className="mb-3">
              <div 
                className="h-1 rounded-full"
                style={{ backgroundColor: 'var(--dashboard-border)' }}
              >
                <div 
                  className="h-1 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${thread.strength * 100}%`,
                    backgroundColor: getStrengthColor(thread.strength)
                  }}
                />
              </div>
            </div>

            {/* Timeline Preview */}
            {thread.timelineEvents.slice(0, 3).map((event, index) => (
              <div key={index} className="flex items-start gap-2 mb-2 last:mb-0">
                <div 
                  className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                  style={{ backgroundColor: 'var(--dashboard-accent-blue)' }}
                />
                <div className="flex-1 min-w-0">
                  <p 
                    className="text-xs truncate"
                    style={{ color: 'var(--dashboard-text-secondary)' }}
                  >
                    {event.event}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="w-3 h-3" style={{ color: 'var(--dashboard-accent-blue)' }} />
                    <span 
                      className="text-xs mono-font"
                      style={{ color: 'var(--dashboard-text-secondary)' }}
                    >
                      {new Date(event.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {/* Footer */}
            <div 
              className="flex items-center justify-between pt-3 mt-3 border-t"
              style={{ borderColor: 'var(--dashboard-border)' }}
            >
              <div className="flex items-center gap-1">
                <Zap className="w-3 h-3" style={{ color: 'var(--dashboard-accent-blue)' }} />
                <span 
                  className="text-xs mono-font"
                  style={{ color: 'var(--dashboard-text-secondary)' }}
                >
                  {thread.storyIds.length} stories
                </span>
              </div>
              <ExternalLink className="w-3 h-3" style={{ color: 'var(--dashboard-accent-blue)' }} />
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-8 pt-6 border-t" style={{ borderColor: 'var(--dashboard-border)' }}>
        <h3 
          className="text-sm font-semibold mb-3"
          style={{ color: 'var(--dashboard-text-primary)' }}
        >
          Quick Actions
        </h3>
        <div className="space-y-2">
          <button 
            className="w-full text-left p-2 rounded text-sm transition-colors duration-200"
            style={{ 
              color: 'var(--dashboard-text-secondary)',
              backgroundColor: 'transparent'
            }}
            onClick={(e) => {
              e.stopPropagation();
              onViewAllConnections();
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--dashboard-bg-card)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <TrendingUp className="w-4 h-4 inline mr-2" />
            View All Connections
          </button>
          <button 
            className="w-full text-left p-2 rounded text-sm transition-colors duration-200"
            style={{ 
              color: 'var(--dashboard-text-secondary)',
              backgroundColor: 'transparent'
            }}
            onClick={(e) => {
              e.stopPropagation();
              onTimelineView();
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--dashboard-bg-card)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <Clock className="w-4 h-4 inline mr-2" />
            Timeline View
          </button>
        </div>
      </div>
    </div>
  );
};
