
import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { SovereignModule } from '../../types';

interface SortableModuleProps {
  module: SovereignModule;
  onUpdateModule: (id: string, updates: Partial<SovereignModule>) => void;
}

const SortableModule: React.FC<SortableModuleProps> = ({ module, onUpdateModule }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: module.id });
  const [isExpanded, setIsExpanded] = React.useState(false);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onUpdateModule(module.id, { [name]: value });
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      {...attributes} 
      className="bg-cockpit-panel border border-cockpit-border rounded-lg p-4 mb-4"
    >
      <div className="flex justify-between items-center">
        <h4 className="font-bold">{module.title}</h4>
        <button onClick={() => setIsExpanded(!isExpanded)} className="text-cockpit-text-secondary">
          {isExpanded ? '▲' : '▼'}
        </button>
      </div>
      {isExpanded && (
        <div className="mt-4">
          <div className="mb-2">
            <label className="block text-sm font-medium text-cockpit-text-secondary">Purpose</label>
            <input 
              type="text" 
              name="purpose" 
              value={module.purpose || ''} 
              onChange={handleChange}
              className="w-full bg-cockpit-bg border border-cockpit-border rounded px-2 py-1 text-cockpit-text-primary"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium text-cockpit-text-secondary">Jurisdiction</label>
            <select 
              name="jurisdiction" 
              value={module.jurisdiction || ''} 
              onChange={handleChange}
              className="w-full bg-cockpit-bg border border-cockpit-border rounded px-2 py-1 text-cockpit-text-primary"
            >
              <option value="">Select Jurisdiction</option>
              <option value="Land">Land</option>
              <option value="Sea">Sea</option>
              <option value="Air">Air</option>
            </select>
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium text-cockpit-text-secondary">Expected Output</label>
            <input 
              type="text" 
              name="expectedOutput" 
              value={module.expectedOutput || ''} 
              onChange={handleChange}
              className="w-full bg-cockpit-bg border border-cockpit-border rounded px-2 py-1 text-cockpit-text-primary"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium text-cockpit-text-secondary">Custom Input (JSON/YAML)</label>
            <textarea 
              name="customInput" 
              value={module.customInput || ''} 
              onChange={handleChange}
              rows={4}
              className="w-full bg-cockpit-bg border border-cockpit-border rounded px-2 py-1 font-mono text-cockpit-text-primary"
            ></textarea>
          </div>
        </div>
      )}
    </div>
  );
};

interface FlowCanvasProps {
  modules: SovereignModule[];
  onUpdateModule: (id: string, updates: Partial<SovereignModule>) => void;
}

export const FlowCanvas: React.FC<FlowCanvasProps> = ({ modules, onUpdateModule }) => {
  const { setNodeRef } = useDroppable({
    id: 'flow-canvas',
  });

  return (
    <div ref={setNodeRef} className="w-2/3 bg-cockpit-bg p-4 rounded-lg">
      <h3 className="text-xl font-bold mb-4">Invocation Flow</h3>
      <SortableContext items={modules.map(m => m.id)} strategy={verticalListSortingStrategy}>
        {modules.map(module => (
          <SortableModule key={module.id} module={module} onUpdateModule={onUpdateModule} />
        ))}
      </SortableContext>
    </div>
  );
};
