import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const SearchBar: React.FC = () => (
    <div className="relative pt-4 pb-3">
      <Search className="absolute left-5 top-12 transform -translate-y-1/2 h-5 w-5 text-neutral-400"></Search>
      <Input
        type="text"
        className="pl-14 py-8 rounded-full text-neutral-200 bg-neutral-800 border-none text-lg"
        placeholder="Digite para buscar..."
      ></Input>
    </div>
);

export default SearchBar;
