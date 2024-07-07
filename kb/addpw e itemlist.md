<geral>
Claro, abaixo tem os dois componentes.
</geral>

<add_password>
import { ArrowLeft, ArrowRight, Copy, Eye, ShieldCheck } from 'lucide-react';
import React, { useState } from 'react';

interface AddPasswordProps {
  onBackClick: () => void;
}

const AddPassword: React.FC<AddPasswordProps> = ({ onBackClick }) => {
  const [siteName, setSiteName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSaveClick = async () => {
    try {
      const response = await fetch('https://secure-pass-api-v2.shuttleapp.rs/passwords', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service: siteName,
          username: username,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save password');
      }

      onBackClick(); // Navigate back after saving
    } catch (error) {
      console.error('Failed to save password:', error);
    }
  };

  return (
    <div className="p-10">
      <header className="flex justify-between items-center mb-4">
        <button
          className="text-2xl text-neutral-300 border-neutral-500 border p-4 rounded-full"
          onClick={onBackClick}
        >
          <ArrowLeft />
        </button>
      </header>

      <h1 className="text-4xl font-light pr-16 pt-3 px-2 text-neutral-300">
        Adicionar <span className="font-bold">Senha</span>
      </h1>

      <div>
        <label className="block text-sm mb-1" htmlFor="site-name">
          Nome do site
        </label>
        <input
          id="site-name"
          type="text"
          value={siteName}
          onChange={(e) => setSiteName(e.target.value)}
          placeholder="Nome do aplicativo"
          className="w-full rounded-full bg-neutral-900 border border-neutral-600 p-5 text-neutral-300"
        />
      </div>
      <div>
        <label className="block text-sm mb-1" htmlFor="username">
          Nome de usuário
        </label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Nome de usuário"
          className="w-full rounded-full bg-neutral-900 border border-neutral-600 p-5 text-neutral-300"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm mb-1" htmlFor="password">
          Senha
        </label>
        <div className="flex items-center rounded-full bg-neutral-900 border border-neutral-600 p-3 text-neutral-300">
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            className="w-full p-2 bg-transparent text-white"
          />
          <button className="p-2">
            <Copy className="text-neutral-500 size-5" />
          </button>
          <button className="p-2">
            <Eye className="text-neutral-500 size-5" />
          </button>
        </div>
      </div>
      <div className="flex items-center text-emerald-300 mb-4">
        <ShieldCheck />
        <p className="ml-2">Segura</p>
      </div>
      <button
        className="w-full text-md rounded-full bg-neutral-300 border border-neutral-600 p-5 text-neutral-800 font-bold flex justify-between items-center"
        onClick={handleSaveClick}
      >
        <span>Salvar Senha</span>
        <ArrowRight />
      </button>
    </div>
  );
};

export default AddPassword;

</add_password>

<itemlist>
import React, { useEffect, useState } from "react";
import Item from "./Item";

interface ItemListProps {
  onPasswordItemClick: (password: { label: string; username: string; password: string }) => void;
}

interface PasswordEntry {
  id: string;
  service: string;
  username: string;
  password: string;
  bgColor?: string; // Add optional bgColor for styling
}

const ItemList: React.FC<ItemListProps> = ({ onPasswordItemClick }) => {
  const [items, setItems] = useState<PasswordEntry[]>([]);

  useEffect(() => {
    const fetchPasswords = async () => {
      try {
        const response = await fetch('https://secure-pass-api-v2.shuttleapp.rs/passwords');
        if (!response.ok) {
          throw new Error('Failed to fetch passwords');
        }
        const entries: PasswordEntry[] = await response.json();
        // Adding bgColor for styling purposes
        const entriesWithBgColor = entries.map((entry, index) => ({
          ...entry,
          bgColor: index % 2 === 0 ? "bg-orange-500" : "bg-pink-500",
        }));
        setItems(entriesWithBgColor);
      } catch (error) {
        console.error("Failed to fetch passwords:", error);
      }
    };

    fetchPasswords();
  }, []);

  return (
    <div className="space-y-4 mt-5">
      {items.map((item, index) => (
        <div
          key={index}
          onClick={() =>
            onPasswordItemClick({
              label: item.service,
              username: item.username,
              password: item.password,
            })
          }
        >
          <Item label={item.service} username={item.username} bgColor={item.bgColor || "bg-gray-500"} password={item.password} />
        </div>
      ))}
      <div className="invisible h-16"></div>
      <div className="invisible h-16"></div>
      <div className="invisible h-16"></div>
    </div>
  );
};

export default ItemList;

</itemlist>