
import React from 'react';
import { TrendingUp, Clock, Zap, ExternalLink, Calendar, Network } from 'lucide-react';
import { StrategicThread } from '@/types/dashboard';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface StrategicConnectionsViewProps {
  threads: StrategicThread[];
  isOpen: boolean;
  onClose: () => void;
}

export const StrategicConnectionsView: React.FC<StrategicConnectionsViewProps> = ({
  threads,
  isOpen,
  onClose
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-5xl h-[80vh] overflow-y-auto"
        style={{ 
          backgroundColor: 'var(--dashboard-bg-card)',
          borderColor: 'var(--dashboard-border)',
          color: 'var(--dashboard-text-primary)'
        }}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold display-font mb-4 flex items-center gap-2">
            <Network className="w-6 h-6" style={{ color: 'var(--dashboard-accent-blue)' }} />
            All Strategic Connections
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div 
            className="text-sm"
            style={{ color: 'var(--dashboard-text-secondary)' }}
          >
            Analyzing {threads.length} strategic threads across {threads.reduce((sum, thread) => sum + thread.storyIds.length, 0)} connected stories
          </div>

          {threads.map((thread) => (
            <div 
              key={thread.id}
              className="border rounded-lg p-6"
              style={{ backgroundColor: 'var(--dashboard-bg-secondary)', borderColor: 'var(--dashboard-border)' }}
            >
              {/* Thread Header */}
              <div className="flex items-start justify-between mb-4">
                <h2 
                  className="text-xl font-bold flex-1 mr-4"
                  style={{ color: 'var(--dashboard-text-primary)' }}
                >
                  {thread.title}
                </h2>
                <div 
                  className="text-sm font-semibold px-3 py-1 rounded border"
                  style={{ 
                    color: getStrengthColor(thread.strength),
                    borderColor: getStrengthColor(thread.strength),
                    backgroundColor: `${getStrengthColor(thread.strength)}20`
                  }}
                >
                  {getStrengthLabel(thread.strength)} CONNECTION
                </div>
              </div>

              {/* Connection Strength Visualization */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span 
                    className="text-sm font-semibold"
                    style={{ color: 'var(--dashboard-text-primary)' }}
                  >
                    Connection Strength
                  </span>
                  <span 
                    className="text-sm mono-font"
                    style={{ color: 'var(--dashboard-text-secondary)' }}
                  >
                    {Math.round(thread.strength * 100)}%
                  </span>
                </div>
                <div 
                  className="h-2 rounded-full"
                  style={{ backgroundColor: 'var(--dashboard-border)' }}
                >
                  <div 
                    className="h-2 rounded-full transition-all duration-500"
                    style={{ 
                      width: `${thread.strength * 100}%`,
                      backgroundColor: getStrengthColor(thread.strength)
                    }}
                  />
                </div>
              </div>

              {/* Timeline Events */}
              <div className="mb-4">
                <h3 
                  className="text-lg font-semibold mb-3"
                  style={{ color: 'var(--dashboard-accent-blue)' }}
                >
                  Timeline of Events
                </h3>
                <div className="space-y-3">
                  {thread.timelineEvents.map((event, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: 'var(--dashboard-accent-blue)' }}
                        />
                        {index < thread.timelineEvents.length - 1 && (
                          <div 
                            className="w-px h-8 mt-2"
                            style={{ backgroundColor: 'var(--dashboard-border)' }}
                          />
                        )}
                      </div>
                      <div className="flex-1">
                        <p 
                          className="font-medium"
                          style={{ color: 'var(--dashboard-text-primary)' }}
                        >
                          {event.event}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Calendar className="w-3 h-3" style={{ color: 'var(--dashboard-accent-blue)' }} />
                          <span 
                            className="text-sm mono-font"
                            style={{ color: 'var(--dashboard-text-secondary)' }}
                          >
                            {formatDate(event.date)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Connected Stories Count */}
              <div 
                className="flex items-center justify-between pt-4 border-t"
                style={{ borderColor: 'var(--dashboard-border)' }}
              >
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4" style={{ color: 'var(--dashboard-accent-blue)' }} />
                  <span 
                    className="text-sm mono-font"
                    style={{ color: 'var(--dashboard-text-secondary)' }}
                  >
                    {thread.storyIds.length} connected stories
                  </span>
                </div>
                <button 
                  className="flex items-center gap-1 text-sm font-medium transition-colors duration-200"
                  style={{ color: 'var(--dashboard-accent-blue)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--dashboard-text-primary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--dashboard-accent-blue)';
                  }}
                >
                  <span>Explore Thread</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
