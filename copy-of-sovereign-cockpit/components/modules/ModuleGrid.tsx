
import React from 'react';
import { SovereignModule } from '../../types';
import { SovereignModuleCard } from '../SovereignModuleCard';

interface ModuleGridProps {
  modules: SovereignModule[];
  onModuleClick: (module: SovereignModule) => void;
}

export const ModuleGrid: React.FC<ModuleGridProps> = ({ modules, onModuleClick }) => {
  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {modules.map((module) => (
          <SovereignModuleCard key={module.id} module={module} onClick={() => onModuleClick(module)} />
        ))}
      </div>
    </section>
  );
};
