import React, { useState } from 'react';
import { Home, ShieldEllipsis, Folder, Plus, Bolt } from 'lucide-react';

interface BottomNavProps {
  onAddPasswordClick: () => void;
  onFoldersClick: () => void;
  onHomeClick: () => void;
  onPasswordGeneratorClick: () => void;
  onSettingsClick: () => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ onAddPasswordClick, onFoldersClick, onHomeClick, onPasswordGeneratorClick, onSettingsClick }) => {
  const [activeItem, setActiveItem] = useState('home');

  const handleItemClick = (item: string, callback: () => void) => {
    setActiveItem(item);
    setTimeout(callback, 0); // Execute the callback after the state update
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-neutral-800 text-white p-4 flex justify-around items-center rounded-full pb-5 pt-5 z-20">
      <div
        className={`flex flex-col items-center ${activeItem === 'home' ? 'border-b-2 pb-1' : ''}`}
        onClick={() => handleItemClick('home', onHomeClick)}
      >
        <Home className='mb-1' />
        <span className="text-sm">Cofre</span>
      </div>
      <div
        className={`flex flex-col items-center ${activeItem === 'folders' ? 'border-b-2 pb-1' : ''}`}
        onClick={() => handleItemClick('folders', onFoldersClick)}
      >
        <Folder className='mb-1' />
        <span className="text-sm">Pastas</span>
      </div>
      <div className="flex flex-col items-center">
        <div
          className="w-12 h-12 bg-white text-gray-800 rounded-full flex items-center justify-center"
          onClick={onAddPasswordClick}
        >
          <Plus />
        </div>
      </div>
      <div
        className={`flex flex-col items-center ${activeItem === 'generator' ? 'border-b-2 pb-1' : ''}`}
        onClick={() => handleItemClick('generator', onPasswordGeneratorClick)}
      >
        <ShieldEllipsis className='mb-1' />
        <span className="text-sm">Gerador</span>
      </div>
      <div
        className={`flex flex-col items-center ${activeItem === 'settings' ? 'border-b-2 pb-1' : ''}`}
        onClick={() => handleItemClick('settings', onSettingsClick)}
      >
        <Bolt className='mb-1' />
        <span className="text-sm">Ajustes</span>
      </div>
    </div>
  );
};

export default BottomNav;
