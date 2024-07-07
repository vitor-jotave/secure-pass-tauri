import React, { useEffect, useState } from "react";
import Item from "./Item";
import AuthService from "../lib/AuthService";
import axios from "axios";

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
        const response = await axios.get('https://secure-pass-api-v2.shuttleapp.rs/api/v1/passwords', {
          withCredentials: true,
        });
        if (response.status !== 200) {
          throw new Error('Failed to fetch passwords');
        }
        const entries = response.data;
        // Adding bgColor for styling purposes
        const entriesWithBgColor = entries.map((entry: PasswordEntry, index: number) => ({
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
