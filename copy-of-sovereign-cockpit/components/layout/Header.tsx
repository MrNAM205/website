import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="text-center mb-12">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
        Sovereign Cockpit
      </h1>
      <p className="mt-4 text-lg text-cockpit-text-secondary max-w-3xl mx-auto">
        A lawful architecture for dialogic authorship and semantic integrity.
      </p>
    </header>
  );
};