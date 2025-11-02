
import React, { useState } from 'react';
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SOVEREIGN_MODULES } from '../../constants';
import { SovereignModule } from '../../types';
import { ModuleSelector } from './ModuleSelector';
import { FlowCanvas } from './FlowCanvas';
import { FlowPreviewPanel } from './FlowPreviewPanel';

export const InvocationFlowBuilder: React.FC = () => {
  const [availableModules, setAvailableModules] = useState<SovereignModule[]>(SOVEREIGN_MODULES);
  const [flowModules, setFlowModules] = useState<SovereignModule[]>([]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const activeModule = availableModules.find(m => m.id === active.id) || flowModules.find(m => m.id === active.id);
      if (!activeModule) return;

      // Moving from available to flow
      if (over.id === 'flow-canvas' && !flowModules.find(m => m.id === active.id)) {
        setFlowModules(prev => [...prev, { ...activeModule }]); // Add a copy to allow independent annotation
      }
      // Reordering within flow
      else if (flowModules.find(m => m.id === over.id)) {
        setFlowModules(prev => {
          const oldIndex = prev.findIndex(m => m.id === active.id);
          const newIndex = prev.findIndex(m => m.id === over.id);
          return arrayMove(prev, oldIndex, newIndex);
        });
      }
    }
  };

  const handleUpdateModule = (id: string, updates: Partial<SovereignModule>) => {
    setFlowModules(prev =>
      prev.map(module => (module.id === id ? { ...module, ...updates } : module))
    );
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="flex gap-8">
        <ModuleSelector modules={availableModules} />
        <FlowCanvas modules={flowModules} onUpdateModule={handleUpdateModule} />
      </div>
      <FlowPreviewPanel flowModules={flowModules} />
    </DndContext>
  );
};
