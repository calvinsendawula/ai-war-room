
import React from 'react';
import { Clock, ExternalLink, TrendingUp, Users, Zap, History } from 'lucide-react';
import { StoryCard as StoryCardType, ImportanceLevel } from '@/types/dashboard';

interface StoryCardProps {
  story: StoryCardType;
  onClick?: () => void;
}

const ImportanceBadge = ({ importance }: { importance: ImportanceLevel }) => {
  const config = {
    HIGH: {
      label: '🔴 HIGH STRATEGIC IMPORTANCE',
      className: 'strategic-badge-high',
      glowClass: 'strategic-glow'
    },
    MEDIUM: {
      label: '🟡 MEDIUM STRATEGIC IMPORTANCE', 
      className: 'strategic-badge-medium',
      glowClass: ''
    },
    EMERGING: {
      label: '🟢 EMERGING/WATCH',
      className: 'strategic-badge-low',
      glowClass: ''
    }
  };

  const { label, className, glowClass } = config[importance];

  return (
    <div className={`${className} ${glowClass} mb-3`}>
      {label}
    </div>
  );
};

const StrategicDimension = ({ 
  icon: Icon, 
  label, 
  value 
}: { 
  icon: React.ElementType; 
  label: string; 
  value: string; 
}) => (
  <div className="flex items-start gap-2 mb-2">
    <Icon className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--dashboard-accent-blue)' }} />
    <div className="text-sm">
      <span className="font-semibold" style={{ color: 'var(--dashboard-text-primary)' }}>
        {label}:
      </span>
      <span className="ml-1" style={{ color: 'var(--dashboard-text-secondary)' }}>
        {value}
      </span>
    </div>
  </div>
);

export const StoryCard: React.FC<StoryCardProps> = ({ story, onClick }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getImportanceClass = (importance: ImportanceLevel) => {
    switch (importance) {
      case 'HIGH': return 'importance-high';
      case 'MEDIUM': return 'importance-medium';
      case 'EMERGING': return 'importance-low';
      default: return 'importance-low';
    }
  };

  return (
    <div 
      className={`
        dashboard-card rounded-lg p-6 cursor-pointer
        animate-slide-in transition-all duration-200
        ${getImportanceClass(story.importance)}
        hover:scale-[1.02] hover:shadow-xl
      `}
      onClick={onClick}
    >
      {/* Importance Badge */}
      <ImportanceBadge importance={story.importance} />

      {/* Story Title */}
      <h2 
        className="text-xl font-bold mb-4 leading-tight display-font"
        style={{ color: 'var(--dashboard-text-primary)' }}
      >
        {story.title}
      </h2>

      {/* Strategic Takeaway */}
      <div className="mb-6">
        <h3 
          className="text-sm font-semibold mb-2 tracking-wide"
          style={{ color: 'var(--dashboard-accent-blue)' }}
        >
          STRATEGIC TAKEAWAY
        </h3>
        <p 
          className="text-sm leading-relaxed body-font"
          style={{ color: 'var(--dashboard-text-secondary)' }}
        >
          {story.strategicTakeaway}
        </p>
      </div>

      {/* Strategic Dimensions */}
      <div className="mb-6">
        <StrategicDimension 
          icon={TrendingUp} 
          label="IMPACT" 
          value={story.strategicDimensions.impact} 
        />
        <StrategicDimension 
          icon={Clock} 
          label="TIMING" 
          value={story.strategicDimensions.timing} 
        />
        <StrategicDimension 
          icon={Users} 
          label="PLAYERS" 
          value={story.strategicDimensions.players} 
        />
        <StrategicDimension 
          icon={History} 
          label="PRECEDENT" 
          value={story.strategicDimensions.precedent} 
        />
      </div>

      {/* Connected Stories */}
      {story.connectedStories.length > 0 && (
        <div className="mb-4">
          <h4 
            className="text-xs font-semibold mb-2 tracking-wide"
            style={{ color: 'var(--dashboard-accent-blue)' }}
          >
            CONNECTED
          </h4>
          {story.connectedStories.slice(0, 2).map((connected) => (
            <div 
              key={connected.id}
              className="text-sm mb-1 flex items-center gap-2"
              style={{ color: 'var(--dashboard-text-secondary)' }}
            >
              <Zap className="w-3 h-3" style={{ color: 'var(--dashboard-accent-blue)' }} />
              <span className="flex-1">
                {connected.title} - {connected.relativeTime}
              </span>
              <span 
                className="text-xs mono-font"
                style={{ color: 'var(--dashboard-text-secondary)' }}
              >
                ({connected.exactDate})
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Sources Footer */}
      <div 
        className="flex items-center justify-between pt-4 border-t"
        style={{ borderColor: 'var(--dashboard-border)' }}
      >
        <div 
          className="text-xs mono-font"
          style={{ color: 'var(--dashboard-text-secondary)' }}
        >
          SOURCES: {story.sources.length} sources
        </div>
        <div className="flex items-center gap-2">
          <span 
            className="text-xs mono-font"
            style={{ color: 'var(--dashboard-text-secondary)' }}
          >
            View Details
          </span>
          <ExternalLink className="w-3 h-3" style={{ color: 'var(--dashboard-accent-blue)' }} />
        </div>
      </div>
    </div>
  );
};
