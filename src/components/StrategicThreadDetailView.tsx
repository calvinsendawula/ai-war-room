
import React from 'react';
import { X, Clock, Zap, TrendingUp, Calendar } from 'lucide-react';
import { StrategicThread } from '@/types/dashboard';

interface StrategicThreadDetailViewProps {
  thread: StrategicThread | null;
  isOpen: boolean;
  onClose: () => void;
}

export const StrategicThreadDetailView: React.FC<StrategicThreadDetailViewProps> = ({
  thread,
  isOpen,
  onClose
}) => {
  if (!isOpen || !thread) return null;

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
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
        onClick={onClose}
      />
      
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] m-4 rounded-lg dashboard-scrollbar overflow-y-auto"
        style={{ backgroundColor: 'var(--dashboard-bg-card)' }}
      >
        {/* Header */}
        <div 
          className="sticky top-0 flex items-center justify-between p-6 border-b"
          style={{ 
            backgroundColor: 'var(--dashboard-bg-card)',
            borderColor: 'var(--dashboard-border)'
          }}
        >
          <div>
            <h2 
              className="text-xl font-bold display-font"
              style={{ color: 'var(--dashboard-text-primary)' }}
            >
              {thread.title}
            </h2>
            <div className="flex items-center gap-4 mt-2">
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
              <div className="flex items-center gap-1">
                <Zap className="w-4 h-4" style={{ color: 'var(--dashboard-accent-blue)' }} />
                <span 
                  className="text-sm mono-font"
                  style={{ color: 'var(--dashboard-text-secondary)' }}
                >
                  {thread.storyIds.length} connected stories
                </span>
              </div>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-opacity-20 transition-colors"
            style={{ 
              color: 'var(--dashboard-text-secondary)',
              backgroundColor: 'transparent'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--dashboard-bg-secondary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Connection Strength Visualization */}
          <div className="mb-8">
            <h3 
              className="text-lg font-semibold mb-4"
              style={{ color: 'var(--dashboard-text-primary)' }}
            >
              Connection Strength
            </h3>
            <div 
              className="h-2 rounded-full mb-2"
              style={{ backgroundColor: 'var(--dashboard-border)' }}
            >
              <div 
                className="h-2 rounded-full transition-all duration-300"
                style={{ 
                  width: `${thread.strength * 100}%`,
                  backgroundColor: getStrengthColor(thread.strength)
                }}
              />
            </div>
            <p 
              className="text-sm"
              style={{ color: 'var(--dashboard-text-secondary)' }}
            >
              {Math.round(thread.strength * 100)}% connection strength based on shared entities, timing, and strategic impact
            </p>
          </div>

          {/* Timeline Events */}
          <div className="mb-8">
            <h3 
              className="text-lg font-semibold mb-4"
              style={{ color: 'var(--dashboard-text-primary)' }}
            >
              Timeline of Events
            </h3>
            <div className="space-y-4">
              {thread.timelineEvents.map((event, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div 
                    className="w-3 h-3 rounded-full mt-2 flex-shrink-0"
                    style={{ backgroundColor: 'var(--dashboard-accent-blue)' }}
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <Calendar className="w-4 h-4" style={{ color: 'var(--dashboard-accent-blue)' }} />
                      <span 
                        className="text-sm mono-font font-semibold"
                        style={{ color: 'var(--dashboard-text-primary)' }}
                      >
                        {new Date(event.date).toLocaleDateString('en-US', { 
                          month: 'long', 
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                    <p 
                      className="text-sm leading-relaxed"
                      style={{ color: 'var(--dashboard-text-secondary)' }}
                    >
                      {event.event}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Strategic Analysis */}
          <div>
            <h3 
              className="text-lg font-semibold mb-4"
              style={{ color: 'var(--dashboard-text-primary)' }}
            >
              Strategic Analysis
            </h3>
            <div 
              className="p-4 rounded-lg"
              style={{ backgroundColor: 'var(--dashboard-bg-secondary)' }}
            >
              <p 
                className="text-sm leading-relaxed"
                style={{ color: 'var(--dashboard-text-secondary)' }}
              >
                This strategic thread represents a significant pattern in the AI landscape, connecting {thread.storyIds.length} related developments. 
                The {getStrengthLabel(thread.strength).toLowerCase()} connection strength indicates these events are likely part of a 
                coordinated industry shift rather than isolated incidents.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
