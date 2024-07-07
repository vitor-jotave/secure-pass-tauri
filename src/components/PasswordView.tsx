import React from 'react';
import { ArrowLeft, PencilLine, Eye, ShieldCheck, Copy } from 'lucide-react';

interface PasswordViewProps {
  password: { label: string, username: string, password: string };
  onBackClick: () => void;
}

const PasswordView: React.FC<PasswordViewProps> = ({ password, onBackClick }) => {
  return (
    <>
    <div className="p-10">
      <header className="flex justify-between items-center mb-4">
        <button className="text-2xl text-neutral-300 border-neutral-500 border p-4 rounded-full" onClick={onBackClick}>
          <ArrowLeft></ArrowLeft>
        </button>
        <button className="text-2xl text-neutral-300 border-neutral-500 border p-4 rounded-full">
          <PencilLine />
        </button>
      </header>

      <h1 className="text-4xl font-medium pr-16 pt-3 px-2 text-neutral-300">{password.label}</h1>

      <div className="">
        <div className="flex bg-emerald-300 text-neutral-900 font-bold p-1 px-2 rounded-full mt-5 w-fit">
        <ShieldCheck className='size-5'></ShieldCheck>
          <p className='mx-1 text-sm'>Esta senha é segura</p>
        </div>
      </div>
      <div>
        <label className="block text-sm mb-1" htmlFor="username">Nome de usuário</label>
        <div className="flex items-center rounded-full bg-neutral-900 border border-neutral-600 p-3 text-neutral-300">
          <input
            id="username"
            type="text"
            value={password.username}
            readOnly
            className="w-full p-2 bg-transparent text-white"
          />
          <button className="p-2">
            <Copy className='text-neutral-500 size-5' />
          </button>
        </div>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm mb-1" htmlFor="password">Senha</label>
        <div className="flex items-center rounded-full bg-neutral-900 border border-neutral-600 p-3 text-neutral-300">
          <input
            id="password"
            type="password"
            placeholder={password.password}
            readOnly
            className="w-full p-2 bg-transparent text-white"
          />
          <button className="p-2">
            <Copy className='text-neutral-500 size-5'></Copy>
          </button>
          <button className="p-2">
            <Eye className='text-neutral-500 size-5'></Eye>
          </button>
        </div>
      </div>
      <div className="flex items-center text-emerald-300 mb-4">
        <ShieldCheck></ShieldCheck>
        <p className="ml-2">Segura</p>
      </div>
      
    </div>
    </>
  );
};

export default PasswordView;
