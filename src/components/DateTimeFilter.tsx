
import React, { useState } from 'react';
import { Calendar, Clock, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

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
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const generateDateOptions = () => {
    const options = [];
    const today = new Date();
    
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      options.push({
        value: dateStr,
        label: i === 0 ? 'Today' : i === 1 ? 'Yesterday' : formatDisplayDate(dateStr)
      });
    }
    
    return options;
  };

  return (
    <div className="flex items-center gap-3">
      {/* Date Selector */}
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
            {selectedDate === new Date().toISOString().split('T')[0] ? 'Today' : formatDisplayDate(selectedDate)}
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          className="w-64 p-2"
          style={{
            backgroundColor: 'var(--dashboard-bg-card)',
            borderColor: 'var(--dashboard-border)'
          }}
        >
          <div className="space-y-1 max-h-64 overflow-y-auto">
            {generateDateOptions().map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onDateChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-sm rounded hover:bg-opacity-20 transition-colors ${
                  selectedDate === option.value ? 'font-semibold' : ''
                }`}
                style={{
                  color: selectedDate === option.value 
                    ? 'var(--dashboard-accent-blue)' 
                    : 'var(--dashboard-text-primary)',
                  backgroundColor: selectedDate === option.value 
                    ? 'var(--dashboard-bg-secondary)' 
                    : 'transparent'
                }}
                onMouseEnter={(e) => {
                  if (selectedDate !== option.value) {
                    e.currentTarget.style.backgroundColor = 'var(--dashboard-bg-secondary)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedDate !== option.value) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
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
