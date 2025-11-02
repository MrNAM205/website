
import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { SovereignModule } from '../../types';

interface DraggableModuleProps {
  module: SovereignModule;
}

const DraggableModule: React.FC<DraggableModuleProps> = ({ module }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: module.id,
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      {...listeners} 
      {...attributes}
      className="bg-cockpit-panel border border-cockpit-border rounded-lg p-4 mb-4 cursor-grab"
    >
      <h4 className="font-bold">{module.title}</h4>
      <p className="text-sm text-cockpit-text-secondary">{module.agentName}</p>
    </div>
  );
};

interface ModuleSelectorProps {
  modules: SovereignModule[];
}

export const ModuleSelector: React.FC<ModuleSelectorProps> = ({ modules }) => {
  return (
    <div className="w-1/3">
      <h3 className="text-xl font-bold mb-4">Available Modules</h3>
      <div>
        {modules.map(module => (
          <DraggableModule key={module.id} module={module} />
        ))}
      </div>
    </div>
  );
};
