
import React, { useState } from 'react';
import { Settings, Clock, Eye, Key, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Slider } from '@/components/ui/slider';
import { UserSettings } from '@/types/dashboard';
import { toast } from '@/hooks/use-toast';

interface DashboardSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  settings: UserSettings;
  onSettingsUpdate: (settings: UserSettings) => void;
}

export const DashboardSettings: React.FC<DashboardSettingsProps> = ({
  isOpen,
  onClose,
  settings,
  onSettingsUpdate
}) => {
  const [localSettings, setLocalSettings] = useState<UserSettings>(settings);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');

  const handleSave = () => {
    // Validate story count
    if (localSettings.topStoriesCount < 1 || localSettings.topStoriesCount > 10) {
      toast({
        title: "Invalid Story Count",
        description: "Story count must be between 1 and 10",
        variant: "destructive"
      });
      return;
    }

    // Validate password change if attempted
    if (newPassword || confirmPassword || currentPassword) {
      if (newPassword !== confirmPassword) {
        toast({
          title: "Password Mismatch",
          description: "New passwords do not match",
          variant: "destructive"
        });
        return;
      }
      if (newPassword.length < 6) {
        toast({
          title: "Password Too Short",
          description: "Password must be at least 6 characters",
          variant: "destructive"
        });
        return;
      }
      if (!currentPassword) {
        toast({
          title: "Current Password Required",
          description: "Please enter your current password to change it",
          variant: "destructive"
        });
        return;
      }
    }

    onSettingsUpdate(localSettings);
    
    toast({
      title: "Settings Updated",
      description: "Your dashboard preferences have been saved",
    });
    
    // Reset password fields
    setNewPassword('');
    setConfirmPassword('');
    setCurrentPassword('');
    
    onClose();
  };

  const formatTime = (hour: number) => {
    if (hour === 0) return '12 AM';
    if (hour < 12) return `${hour} AM`;
    if (hour === 12) return '12 PM';
    return `${hour - 12} PM`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto"
        style={{ 
          backgroundColor: 'var(--dashboard-bg-card)',
          borderColor: 'var(--dashboard-border)',
          color: 'var(--dashboard-text-primary)'
        }}
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Dashboard Settings
          </DialogTitle>
          <DialogDescription style={{ color: 'var(--dashboard-text-secondary)' }}>
            Customize your AI War Room experience
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Feed Times */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <Label className="text-sm font-medium">Feed Update Times</Label>
            </div>
            
            <div className="space-y-3">
              <div>
                <Label className="text-xs text-gray-400 mb-2 block">Morning Feed (Hour: {localSettings.morningFeedHour})</Label>
                <Slider
                  value={[localSettings.morningFeedHour]}
                  onValueChange={([value]) => setLocalSettings({...localSettings, morningFeedHour: value})}
                  min={5}
                  max={11}
                  step={1}
                  className="w-full"
                />
                <div className="text-xs text-gray-400 mt-1">
                  Current: {formatTime(localSettings.morningFeedHour)}
                </div>
              </div>

              <div>
                <Label className="text-xs text-gray-400 mb-2 block">Evening Feed (Hour: {localSettings.eveningFeedHour})</Label>
                <Slider
                  value={[localSettings.eveningFeedHour]}
                  onValueChange={([value]) => setLocalSettings({...localSettings, eveningFeedHour: value})}
                  min={13}
                  max={20}
                  step={1}
                  className="w-full"
                />
                <div className="text-xs text-gray-400 mt-1">
                  Current: {formatTime(localSettings.eveningFeedHour)}
                </div>
              </div>
            </div>
          </div>

          {/* Story Count */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              <Label className="text-sm font-medium">Number of Top Stories</Label>
            </div>
            <div className="space-y-2">
              <Slider
                value={[localSettings.topStoriesCount]}
                onValueChange={([value]) => setLocalSettings({...localSettings, topStoriesCount: value})}
                min={1}
                max={10}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-400">
                <span>1 story</span>
                <span className="font-medium">{localSettings.topStoriesCount} stories</span>
                <span>10 stories</span>
              </div>
            </div>
          </div>

          {/* Password Change */}
          <div className="space-y-3 border-t pt-4" style={{ borderColor: 'var(--dashboard-border)' }}>
            <div className="flex items-center gap-2">
              <Key className="w-4 h-4" />
              <Label className="text-sm font-medium">Change Password</Label>
            </div>
            
            <div className="space-y-3">
              <div>
                <Label className="text-xs text-gray-400">Current Password</Label>
                <Input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                  className="mt-1"
                  style={{
                    backgroundColor: 'var(--dashboard-bg-secondary)',
                    borderColor: 'var(--dashboard-border)',
                    color: 'var(--dashboard-text-primary)'
                  }}
                />
              </div>
              
              <div>
                <Label className="text-xs text-gray-400">New Password</Label>
                <Input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password (min 6 characters)"
                  className="mt-1"
                  style={{
                    backgroundColor: 'var(--dashboard-bg-secondary)',
                    borderColor: 'var(--dashboard-border)',
                    color: 'var(--dashboard-text-primary)'
                  }}
                />
              </div>
              
              <div>
                <Label className="text-xs text-gray-400">Confirm New Password</Label>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="mt-1"
                  style={{
                    backgroundColor: 'var(--dashboard-bg-secondary)',
                    borderColor: 'var(--dashboard-border)',
                    color: 'var(--dashboard-text-primary)'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Auto Refresh Interval */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Auto Refresh Interval</Label>
            <div className="space-y-2">
              <Slider
                value={[localSettings.refreshInterval]}
                onValueChange={([value]) => setLocalSettings({...localSettings, refreshInterval: value})}
                min={5}
                max={60}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-400">
                <span>5 min</span>
                <span className="font-medium">{localSettings.refreshInterval} minutes</span>
                <span>60 min</span>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            style={{
              backgroundColor: 'var(--dashboard-bg-secondary)',
              borderColor: 'var(--dashboard-border)',
              color: 'var(--dashboard-text-secondary)'
            }}
          >
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            style={{
              backgroundColor: 'var(--dashboard-accent-blue)',
              color: 'white'
            }}
          >
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
