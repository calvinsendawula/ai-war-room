
import React from 'react';
import { Calendar, Clock, TrendingUp, Zap, ExternalLink } from 'lucide-react';
import { StrategicThread, StoryCard } from '@/types/dashboard';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface TimelineViewProps {
  threads: StrategicThread[];
  stories: StoryCard[];
  isOpen: boolean;
  onClose: () => void;
}

interface TimelineEvent {
  date: string;
  event: string;
  type: 'story' | 'thread_event';
  importance?: string;
  threadId?: string;
  storyId?: string;
}

export const TimelineView: React.FC<TimelineViewProps> = ({
  threads,
  stories,
  isOpen,
  onClose
}) => {
  // Combine all events into a single timeline
  const getAllEvents = (): TimelineEvent[] => {
    const events: TimelineEvent[] = [];

    // Add story events
    stories.forEach(story => {
      events.push({
        date: story.publishedAt,
        event: story.title,
        type: 'story',
        importance: story.importance,
        storyId: story.id
      });
    });

    // Add thread events
    threads.forEach(thread => {
      thread.timelineEvents.forEach(event => {
        events.push({
          date: event.date,
          event: event.event,
          type: 'thread_event',
          threadId: thread.id
        });
      });
    });

    // Sort by date (newest first)
    return events.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getImportanceColor = (importance?: string) => {
    switch (importance) {
      case 'HIGH': return 'var(--dashboard-accent-high)';
      case 'MEDIUM': return 'var(--dashboard-accent-medium)';
      case 'EMERGING': return 'var(--dashboard-accent-low)';
      default: return 'var(--dashboard-accent-blue)';
    }
  };

  const timelineEvents = getAllEvents();

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
          <DialogTitle className="text-2xl font-bold display-font mb-4 flex items-center gap-2">
            <Calendar className="w-6 h-6" style={{ color: 'var(--dashboard-accent-blue)' }} />
            Strategic Timeline
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div 
            className="text-sm"
            style={{ color: 'var(--dashboard-text-secondary)' }}
          >
            Tracking {timelineEvents.length} strategic developments across the AI landscape
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div 
              className="absolute left-6 top-0 bottom-0 w-px"
              style={{ backgroundColor: 'var(--dashboard-border)' }}
            />

            {/* Timeline Events */}
            <div className="space-y-6">
              {timelineEvents.map((event, index) => (
                <div key={index} className="relative flex items-start gap-6">
                  {/* Timeline Dot */}
                  <div className="relative z-10">
                    <div 
                      className="w-4 h-4 rounded-full border-2"
                      style={{ 
                        backgroundColor: 'var(--dashboard-bg-card)',
                        borderColor: getImportanceColor(event.importance)
                      }}
                    />
                  </div>

                  {/* Event Content */}
                  <div 
                    className="flex-1 p-4 rounded-lg border cursor-pointer transition-all duration-200 hover:scale-[1.01]"
                    style={{ 
                      backgroundColor: 'var(--dashboard-bg-secondary)',
                      borderColor: 'var(--dashboard-border)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = getImportanceColor(event.importance);
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--dashboard-border)';
                    }}
                  >
                    {/* Event Header */}
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          {event.type === 'story' ? (
                            <TrendingUp className="w-4 h-4" style={{ color: getImportanceColor(event.importance) }} />
                          ) : (
                            <Zap className="w-4 h-4" style={{ color: 'var(--dashboard-accent-blue)' }} />
                          )}
                          <span 
                            className="text-xs uppercase font-semibold"
                            style={{ color: 'var(--dashboard-text-secondary)' }}
                          >
                            {event.type === 'story' ? 'Strategic Story' : 'Thread Event'}
                          </span>
                        </div>
                        {event.importance && (
                          <span 
                            className="text-xs px-2 py-1 rounded"
                            style={{ 
                              backgroundColor: `${getImportanceColor(event.importance)}20`,
                              color: getImportanceColor(event.importance)
                            }}
                          >
                            {event.importance}
                          </span>
                        )}
                      </div>
                      <ExternalLink className="w-4 h-4" style={{ color: 'var(--dashboard-accent-blue)' }} />
                    </div>

                    {/* Event Title */}
                    <h3 
                      className="text-lg font-semibold mb-2"
                      style={{ color: 'var(--dashboard-text-primary)' }}
                    >
                      {event.event}
                    </h3>

                    {/* Event Time */}
                    <div className="flex items-center gap-4 text-sm" style={{ color: 'var(--dashboard-text-secondary)' }}>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(event.date)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{formatTime(event.date)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary Stats */}
          <div 
            className="p-4 rounded-lg border-t"
            style={{ 
              backgroundColor: 'var(--dashboard-bg-secondary)',
              borderColor: 'var(--dashboard-border)'
            }}
          >
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div 
                  className="text-2xl font-bold mono-font"
                  style={{ color: 'var(--dashboard-accent-high)' }}
                >
                  {stories.filter(s => s.importance === 'HIGH').length}
                </div>
                <div 
                  className="text-sm"
                  style={{ color: 'var(--dashboard-text-secondary)' }}
                >
                  High Priority
                </div>
              </div>
              <div>
                <div 
                  className="text-2xl font-bold mono-font"
                  style={{ color: 'var(--dashboard-accent-medium)' }}
                >
                  {stories.filter(s => s.importance === 'MEDIUM').length}
                </div>
                <div 
                  className="text-sm"
                  style={{ color: 'var(--dashboard-text-secondary)' }}
                >
                  Medium Priority
                </div>
              </div>
              <div>
                <div 
                  className="text-2xl font-bold mono-font"
                  style={{ color: 'var(--dashboard-accent-low)' }}
                >
                  {stories.filter(s => s.importance === 'EMERGING').length}
                </div>
                <div 
                  className="text-sm"
                  style={{ color: 'var(--dashboard-text-secondary)' }}
                >
                  Emerging
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
