
import React from 'react';

interface ModeToggleProps {
  mode: 'narrative' | 'legal';
  setMode: (mode: 'narrative' | 'legal') => void;
}

export const ModeToggle: React.FC<ModeToggleProps> = ({ mode, setMode }) => {
  return (
    <div className="flex bg-cockpit-panel rounded-full p-1 mb-4">
      <button
        onClick={() => setMode('narrative')}
        className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-colors duration-300
          ${mode === 'narrative' ? 'bg-cockpit-accent text-white' : 'text-cockpit-text-secondary hover:bg-cockpit-bg'}`}
      >
        Narrative Mode
      </button>
      <button
        onClick={() => setMode('legal')}
        className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-colors duration-300
          ${mode === 'legal' ? 'bg-cockpit-accent text-white' : 'text-cockpit-text-secondary hover:bg-cockpit-bg'}`}
      >
        Legal Mode
      </button>
    </div>
  );
};
