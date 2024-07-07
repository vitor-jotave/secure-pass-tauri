import { LogOut } from "lucide-react";
import React from "react";

const SettingsView: React.FC = () => {
  return (
    <>
      <div className="p-10">
        <h1 className="text-4xl font-medium pr-10 pt-3 px-2 text-neutral-300">
          Personalize suas Configurações
        </h1>

        <div className="mt-6">
          <div className="flex justify-between bg-neutral-900 text-red-400 font-bold p-5 px-5 rounded-full mt-5 w-full">
            <p className="mx-1 text-md">Sair</p>
            <LogOut className="size-5"></LogOut>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsView;
