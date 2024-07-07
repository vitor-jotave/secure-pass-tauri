import React, { useRef } from 'react';
import { Copy } from 'lucide-react';
import useVisibility from '../hooks/useVisibility';

interface ItemProps {
  label: string;
  username: string;
  password: string;
  bgColor: string;
}

const Item: React.FC<ItemProps> = ({ label, username, bgColor, password }) => {

    const ref = useRef<HTMLDivElement>(null);
    const isVisible = useVisibility(ref, 0.6);

return (

<div ref={ref} className={`flex items-center rounded-3xl bg-neutral-800 text-white mb-4 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
    <div className={`flex-none w-20 h-32 rounded-l-3xl ${bgColor} flex items-center justify-center text-2xl font-bold`}>
      {label.slice(0, 2)}
    </div>
    <div className="ml-4 my-7 flex-grow">
    <div className="text-sm text-gray-400">{label}</div>
      <div className="text-lg">{username}</div>
      <div className="text-sm text-gray-400">{password}</div>
    </div>
    <button className="flex-none p-5 mr-4 bg-neutral-700 rounded-full">
        <Copy></Copy>
    </button>
  </div>
);
};

export default Item;
