
import React from 'react';
import { SovereignModule } from '../types';
import { LaunchIcon } from './icons/LaunchIcon';

interface SovereignModuleCardProps {
  module: SovereignModule;
  onClick: () => void;
}

export const SovereignModuleCard: React.FC<SovereignModuleCardProps> = ({ module, onClick }) => {
  return (
    <div 
      className="bg-cockpit-panel border border-cockpit-border rounded-lg p-6 flex flex-col justify-between h-full transform hover:-translate-y-1 transition-transform duration-300 shadow-lg hover:shadow-cockpit-accent/20 cursor-pointer"
      onClick={onClick}
    >
      <div>
        <h3 className="text-xl font-bold text-cockpit-text-primary mb-2">{module.title}</h3>
        <p className="text-cockpit-text-secondary text-sm mb-4">{module.description}</p>
      </div>
      <div className="flex items-center justify-between mt-4">
        <span className="text-xs font-mono bg-cockpit-bg px-2 py-1 rounded">{module.agentName}</span>
        <div className="text-cockpit-accent">
          <LaunchIcon />
        </div>
      </div>
    </div>
  );
};