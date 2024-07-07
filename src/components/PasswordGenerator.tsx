import { ArrowRight, Repeat2 } from "lucide-react";
import React, { useState } from "react";
import { Switch } from "./ui/switch";

const PasswordGenerator: React.FC = () => {
  const [password] = useState(
    "KQ(xX0dH/a<^r6Ek4v.{nl5dtxgS}a=0\\P!"
  );
  const [digits, setDigits] = useState(1);

  return (
    <div className="p-10">
      <h1 className="text-4xl font-light pr-24 pt-3 px-2 text-neutral-200">
        Gere uma <span className="font-bold">Senha Segura</span>
      </h1>

      <div className="h-60 border border-neutral-800 rounded-md bg-neutral-900 p-5 my-5 text-4xl font-medium break-all leading-tight">
        <span>{password}</span>
      </div>

      <div className="flex flex-col border border-neutral-800 rounded-md bg-neutral-900 p-5 my-5">
        <label className="mb-3">
          Digitos{" "}
          <span className="ml-2 px-4 py-1 rounded-full font-bold text-neutral-900 bg-indigo-400">
            {digits}
          </span>{" "}
        </label>

        <input
          type="range"
          min="1"
          max="20"
          value={digits}
          onChange={(e) => setDigits(Number(e.target.value))}
        />
      </div>
      <div className="flex flex-row justify-between border border-neutral-800 rounded-md bg-neutral-900 p-5 my-5">
        <label>Números</label>
        <Switch className="dark"></Switch>
      </div>
      <div className="flex flex-row justify-between border border-neutral-800 rounded-md bg-neutral-900 p-5 my-5">
        <label>Simbolos</label>
        <Switch className="dark"></Switch>
      </div>

      <div className="flex justify-between">
        <button className="text-md rounded-full bg-neutral-300 border border-neutral-600 p-5 text-neutral-800 font-bold flex justify-between items-center">
          <Repeat2></Repeat2>
        </button>
        <button className="text-md rounded-full bg-neutral-300 border border-neutral-600 p-5 text-neutral-800 font-bold flex justify-between items-center">
          <span>Usar</span>
          <ArrowRight></ArrowRight>
        </button>
      </div>
      <div className="h-48"></div>
    </div>
  );
};

export default PasswordGenerator;
