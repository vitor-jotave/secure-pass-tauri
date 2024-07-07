import React from 'react';
import SearchBar from './SearchBar';

interface Folder {
  name: string;
  items: number;
  color: string;
}

interface FoldersViewProps {
  folders: Folder[];
  onBackClick: () => void;
}

const FoldersView: React.FC<FoldersViewProps> = ({ folders }) => {
  return (
    <div className="p-10">
      <h1 className="text-4xl font-light pr-36 pt-3 px-2 text-neutral-200">Suas <span className='font-bold'>Pastas</span></h1>
      <SearchBar />
      
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="flex items-center justify-center bg-neutral-800 rounded-xl p-4">
          <span className="text-2xl">+</span>
        </div>
        {folders.map((folder, index) => (
          <div key={index} className="bg-neutral-800 rounded-xl p-4">
            <h2 className="text-xl font-bold">{folder.name}</h2>
            <div className="flex items-center mt-2">
              <div className={`rounded-full h-8 w-8 ${folder.color} flex items-center justify-center text-white`}>
                {folder.name.substring(0, 2)}
              </div>
              <span className="ml-2 text-gray-400">{folder.items} item(s)</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoldersView;
