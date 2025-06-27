
import React from 'react';
import { Settings, LogOut, Clock, Activity, Database, AlertTriangle } from 'lucide-react';
import { DashboardStats } from '@/types/dashboard';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface DashboardHeaderProps {
  stats: DashboardStats;
  onSettingsClick: () => void;
  onLogout: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  stats,
  onSettingsClick,
  onLogout
}) => {
  const formatLastUpdate = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <header 
      className="border-b px-6 py-4"
      style={{ 
        backgroundColor: 'var(--dashboard-bg-secondary)',
        borderColor: 'var(--dashboard-border)'
      }}
    >
      <div className="flex items-center justify-between">
        {/* Left Section - Logo and Status */}
        <div className="flex items-center gap-6">
          <div>
            <h1 
              className="text-2xl font-bold display-font"
              style={{ color: 'var(--dashboard-text-primary)' }}
            >
              AI War Room
            </h1>
            <div 
              className="flex items-center gap-2 text-sm mono-font mt-1"
              style={{ color: 'var(--dashboard-text-secondary)' }}
            >
              <Clock className="w-4 h-4" />
              <span>Last Updated: {formatLastUpdate(stats.lastUpdateTime)}</span>
              <div 
                className="w-2 h-2 rounded-full animate-pulse ml-2"
                style={{ backgroundColor: 'var(--dashboard-accent-low)' }}
              />
            </div>
          </div>
        </div>

        {/* Center Section - Quick Stats */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 text-sm">
            <Database 
              className="w-4 h-4" 
              style={{ color: 'var(--dashboard-accent-blue)' }} 
            />
            <span 
              className="mono-font font-semibold"
              style={{ color: 'var(--dashboard-text-primary)' }}
            >
              {stats.totalStoriesAnalyzed.toLocaleString()}
            </span>
            <span 
              className="text-xs"
              style={{ color: 'var(--dashboard-text-secondary)' }}
            >
              stories analyzed
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Activity 
              className="w-4 h-4" 
              style={{ color: 'var(--dashboard-accent-blue)' }} 
            />
            <span 
              className="mono-font font-semibold"
              style={{ color: 'var(--dashboard-text-primary)' }}
            >
              {stats.sourcesMonitored}
            </span>
            <span 
              className="text-xs"
              style={{ color: 'var(--dashboard-text-secondary)' }}
            >
              sources
            </span>
          </div>

          {stats.alertsCount > 0 && (
            <div className="flex items-center gap-2 text-sm">
              <AlertTriangle 
                className="w-4 h-4" 
                style={{ color: 'var(--dashboard-accent-high)' }} 
              />
              <span 
                className="mono-font font-semibold"
                style={{ color: 'var(--dashboard-accent-high)' }}
              >
                {stats.alertsCount}
              </span>
              <span 
                className="text-xs"
                style={{ color: 'var(--dashboard-text-secondary)' }}
              >
                alerts
              </span>
            </div>
          )}
        </div>

        {/* Right Section - User Menu */}
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm"
                className="hover:bg-opacity-20"
                style={{ 
                  color: 'var(--dashboard-text-secondary)',
                  backgroundColor: 'transparent'
                }}
              >
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="end"
              className="w-56"
              style={{ 
                backgroundColor: 'var(--dashboard-bg-card)',
                borderColor: 'var(--dashboard-border)',
                color: 'var(--dashboard-text-primary)'
              }}
            >
              <DropdownMenuItem 
                onClick={onSettingsClick}
                className="hover:bg-opacity-20"
                style={{ 
                  color: 'var(--dashboard-text-primary)'
                }}
              >
                <Settings className="w-4 h-4 mr-2" />
                Dashboard Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator style={{ backgroundColor: 'var(--dashboard-border)' }} />
              <DropdownMenuItem 
                onClick={onLogout}
                className="hover:bg-opacity-20 text-red-400"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
