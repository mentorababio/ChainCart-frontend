import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import SearchModal from "./SearchModal";

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSearch = () => {
    if (query.trim() !== "") {
      setIsOpen(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="flex items-center lg:w-60">
      <Input
        type="text"
        placeholder="🔍 Ask for your dream home... ⭐🏡✨"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full max-w-sm text-white md:text-input placeholder:text-gray-500 border-primary"
      />

      <SearchModal query={query} isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default SearchBar;
