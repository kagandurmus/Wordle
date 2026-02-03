import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Switch } from './ui/switch';

const SettingsModal = ({ isOpen, onClose, settings, onSettingChange }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#121213] border-[#3a3a3c] text-white max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="text-center text-[16px] font-bold tracking-wide">SETTINGS</DialogTitle>
        </DialogHeader>
        
        <div className="py-4 space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-[#3a3a3c]">
            <div>
              <p className="text-[16px]">Hard Mode</p>
              <p className="text-[12px] text-gray-500">Any revealed hints must be used in subsequent guesses</p>
            </div>
            <Switch
              checked={settings.hardMode}
              onCheckedChange={(checked) => onSettingChange('hardMode', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between py-3 border-b border-[#3a3a3c]">
            <div>
              <p className="text-[16px]">Dark Theme</p>
            </div>
            <Switch
              checked={settings.darkTheme}
              onCheckedChange={(checked) => onSettingChange('darkTheme', checked)}
              disabled
            />
          </div>
          
          <div className="flex items-center justify-between py-3 border-b border-[#3a3a3c]">
            <div>
              <p className="text-[16px]">High Contrast Mode</p>
              <p className="text-[12px] text-gray-500">For improved color vision</p>
            </div>
            <Switch
              checked={settings.highContrast}
              onCheckedChange={(checked) => onSettingChange('highContrast', checked)}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;
