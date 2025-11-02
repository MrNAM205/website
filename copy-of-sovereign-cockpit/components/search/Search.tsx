
import React from 'react';
import { SearchIcon } from '../icons/SearchIcon';

interface SearchProps {
  searchTerm: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Search: React.FC<SearchProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <section className="max-w-4xl mx-auto mb-16">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <SearchIcon />
        </div>
        <input
          type="text"
          placeholder="Describe your invocation or select a sovereign module below"
          className="w-full bg-cockpit-panel border border-cockpit-border rounded-full py-4 pl-14 pr-6 text-lg placeholder-cockpit-text-secondary focus:outline-none focus:ring-2 focus:ring-cockpit-accent transition-shadow duration-300"
          value={searchTerm}
          onChange={onSearchChange}
        />
      </div>
    </section>
  );
};
