
import React, { useState } from 'react';
import { Calendar, Clock, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';

interface DateTimeFilterProps {
  selectedDate: string;
  selectedTime: '6am' | '6pm';
  onDateChange: (date: string) => void;
  onTimeChange: (time: '6am' | '6pm') => void;
  onManualRefresh: () => void;
  canRefresh: boolean;
}

export const DateTimeFilter: React.FC<DateTimeFilterProps> = ({
  selectedDate,
  selectedTime,
  onDateChange,
  onTimeChange,
  onManualRefresh,
  canRefresh
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const formatDisplayDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    
    if (dateStr === today.toISOString().split('T')[0]) {
      return 'Today';
    } else if (dateStr === yesterday.toISOString().split('T')[0]) {
      return 'Yesterday';
    }
    
    return format(date, 'MMM d, yyyy');
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      const dateStr = date.toISOString().split('T')[0];
      onDateChange(dateStr);
      setIsOpen(false);
    }
  };

  return (
    <div className="flex items-center gap-3">
      {/* Date Selector with Calendar */}
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="h-9 px-3 text-sm"
            style={{
              backgroundColor: 'var(--dashboard-bg-secondary)',
              borderColor: 'var(--dashboard-border)',
              color: 'var(--dashboard-text-primary)'
            }}
          >
            <Calendar className="w-4 h-4 mr-2" />
            {formatDisplayDate(selectedDate)}
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          className="w-auto p-0"
          style={{
            backgroundColor: 'var(--dashboard-bg-card)',
            borderColor: 'var(--dashboard-border)'
          }}
        >
          <CalendarComponent
            mode="single"
            selected={new Date(selectedDate)}
            onSelect={handleDateSelect}
            disabled={(date) => {
              const today = new Date();
              const thirtyDaysAgo = new Date(today);
              thirtyDaysAgo.setDate(today.getDate() - 30);
              return date > today || date < thirtyDaysAgo;
            }}
            initialFocus
            className="pointer-events-auto"
          />
        </PopoverContent>
      </Popover>

      {/* Time Selector */}
      <div className="flex rounded border" style={{ borderColor: 'var(--dashboard-border)' }}>
        <button
          onClick={() => onTimeChange('6am')}
          className={`px-3 py-1.5 text-sm transition-colors ${
            selectedTime === '6am' ? 'font-semibold' : ''
          }`}
          style={{
            backgroundColor: selectedTime === '6am' 
              ? 'var(--dashboard-accent-blue)' 
              : 'var(--dashboard-bg-secondary)',
            color: selectedTime === '6am' 
              ? 'white' 
              : 'var(--dashboard-text-secondary)'
          }}
        >
          <Clock className="w-3 h-3 inline mr-1" />
          6 AM
        </button>
        <button
          onClick={() => onTimeChange('6pm')}
          className={`px-3 py-1.5 text-sm transition-colors ${
            selectedTime === '6pm' ? 'font-semibold' : ''
          }`}
          style={{
            backgroundColor: selectedTime === '6pm' 
              ? 'var(--dashboard-accent-blue)' 
              : 'var(--dashboard-bg-secondary)',
            color: selectedTime === '6pm' 
              ? 'white' 
              : 'var(--dashboard-text-secondary)'
          }}
        >
          <Clock className="w-3 h-3 inline mr-1" />
          6 PM
        </button>
      </div>

      {/* Manual Refresh Button */}
      <Button
        onClick={onManualRefresh}
        disabled={!canRefresh}
        variant="outline"
        size="sm"
        className="h-9 px-3"
        style={{
          backgroundColor: canRefresh ? 'var(--dashboard-bg-secondary)' : 'var(--dashboard-border)',
          borderColor: 'var(--dashboard-border)',
          color: canRefresh ? 'var(--dashboard-text-primary)' : 'var(--dashboard-text-secondary)',
          opacity: canRefresh ? 1 : 0.5
        }}
      >
        <RefreshCw className="w-4 h-4 mr-2" />
        Refresh
      </Button>
    </div>
  );
};
