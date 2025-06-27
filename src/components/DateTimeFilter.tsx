
import React, { useState } from 'react';
import { Calendar, Clock, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';

interface DateTimeFilterProps {
  selectedDate: string;
  selectedTime: '7am' | '4pm' | string;
  onDateChange: (date: string) => void;
  onTimeChange: (time: '7am' | '4pm' | string) => void;
  onManualRefresh: () => void;
  canRefresh: boolean;
  isRefreshing: boolean;
}

export const DateTimeFilter: React.FC<DateTimeFilterProps> = ({
  selectedDate,
  selectedTime,
  onDateChange,
  onTimeChange,
  onManualRefresh,
  canRefresh,
  isRefreshing
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

  const isStandardTime = (time: string) => {
    return time === '7am' || time === '4pm';
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
            selected={new Date(selectedDate + 'T12:00:00')}
            onSelect={handleDateSelect}
            disabled={(date) => {
              const today = new Date();
              const thirtyDaysAgo = new Date(today);
              thirtyDaysAgo.setDate(today.getDate() - 30);
              return date > today || date < thirtyDaysAgo;
            }}
            initialFocus
            className="pointer-events-auto"
            classNames={{
              day_selected:
                "bg-blue-600 text-white hover:bg-blue-700 hover:text-white focus:bg-blue-600 focus:text-white",
              day_today: "bg-gray-100 text-black font-semibold",
              day: "text-gray-200 hover:bg-gray-700 hover:text-white",
              head_cell: "text-gray-300",
              caption_label: "text-gray-200",
              nav_button: "text-gray-300 hover:text-white"
            }}
          />
        </PopoverContent>
      </Popover>

      {/* Time Selector */}
      <div className="flex rounded border" style={{ borderColor: 'var(--dashboard-border)' }}>
        <button
          onClick={() => onTimeChange('7am')}
          className={`px-3 py-1.5 text-sm transition-colors ${
            selectedTime === '7am' ? 'font-semibold' : ''
          }`}
          style={{
            backgroundColor: selectedTime === '7am' 
              ? 'var(--dashboard-accent-blue)' 
              : 'var(--dashboard-bg-secondary)',
            color: selectedTime === '7am' 
              ? 'white' 
              : 'var(--dashboard-text-secondary)'
          }}
        >
          <Clock className="w-3 h-3 inline mr-1" />
          7 AM
        </button>
        <button
          onClick={() => onTimeChange('4pm')}
          className={`px-3 py-1.5 text-sm transition-colors ${
            selectedTime === '4pm' ? 'font-semibold' : ''
          }`}
          style={{
            backgroundColor: selectedTime === '4pm' 
              ? 'var(--dashboard-accent-blue)' 
              : 'var(--dashboard-bg-secondary)',
            color: selectedTime === '4pm' 
              ? 'white' 
              : 'var(--dashboard-text-secondary)'
          }}
        >
          <Clock className="w-3 h-3 inline mr-1" />
          4 PM
        </button>
        
        {/* Show custom refresh time if exists */}
        {!isStandardTime(selectedTime) && (
          <button
            className="px-3 py-1.5 text-sm font-semibold"
            style={{
              backgroundColor: 'var(--dashboard-accent-blue)',
              color: 'white'
            }}
          >
            <Clock className="w-3 h-3 inline mr-1" />
            {selectedTime}
          </button>
        )}
      </div>

      {/* Manual Refresh Button */}
      <Button
        onClick={onManualRefresh}
        disabled={!canRefresh || isRefreshing}
        variant="outline"
        size="sm"
        className="h-9 px-3"
        style={{
          backgroundColor: (canRefresh && !isRefreshing) ? 'var(--dashboard-bg-secondary)' : 'var(--dashboard-border)',
          borderColor: 'var(--dashboard-border)',
          color: (canRefresh && !isRefreshing) ? 'var(--dashboard-text-primary)' : 'var(--dashboard-text-secondary)',
          opacity: (canRefresh && !isRefreshing) ? 1 : 0.5
        }}
      >
        <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
        {isRefreshing ? 'Pulling New Feed...' : 'Refresh'}
      </Button>
    </div>
  );
};
