
import React, { useState } from 'react';
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import YAML from 'js-yaml';
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

  const handleSaveFlow = () => {
    const steps = flowModules.map(module => ({
      agent: module.agentName,
      ...(module.purpose && { purpose: module.purpose }),
      ...(module.jurisdiction && { jurisdiction: module.jurisdiction }),
      ...(module.expectedOutput && { expected_output: module.expectedOutput }),
      ...(module.customInput && { input: JSON.parse(module.customInput) }),
    }));

    const flow = {
      sovereign_flow: {
        name: "Generated Flow",
        steps,
        lineage: {
          created_by: "Daddy",
          timestamp: new Date().toISOString(),
        },
      },
    };

    const yamlContent = YAML.dump(flow);
    const blob = new Blob([yamlContent], { type: 'text/yaml;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'invocation_flow.yaml';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleLoadFlow = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const loadedYaml = e.target?.result as string;
          const parsedFlow: any = YAML.load(loadedYaml);
          if (parsedFlow?.sovereign_flow?.steps) {
            const loadedModules: SovereignModule[] = parsedFlow.sovereign_flow.steps.map((step: any) => {
              // Find the original module to get description and id, then apply loaded annotations
              const originalModule = SOVEREIGN_MODULES.find(m => m.agentName === step.agent);
              return {
                id: originalModule?.id || step.agent, // Use original ID or agentName as fallback
                title: originalModule?.title || step.agent, // Use original title or agentName as fallback
                description: originalModule?.description || '', // Use original description or empty
                agentName: step.agent,
                purpose: step.purpose,
                jurisdiction: step.jurisdiction,
                expectedOutput: step.expected_output,
                customInput: step.input ? JSON.stringify(step.input, null, 2) : undefined,
              };
            });
            setFlowModules(loadedModules);
          } else {
            console.error("Invalid flow file structure");
            alert("Invalid flow file structure");
          }
        } catch (error) {
          console.error("Error parsing YAML file:", error);
          alert("Error parsing YAML file. Please ensure it's a valid YAML format.");
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="flex gap-8">
        <ModuleSelector modules={availableModules} />
        <div className="flex flex-col w-2/3">
          <div className="flex justify-end gap-2 mb-4">
            <button 
              onClick={handleSaveFlow} 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Save Flow
            </button>
            <input 
              type="file" 
              accept=".yaml,.yml" 
              onChange={handleLoadFlow} 
              style={{ display: 'none' }} 
              id="load-flow-input"
            />
            <label 
              htmlFor="load-flow-input" 
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
            >
              Load Flow
            </label>
          </div>
          <FlowCanvas modules={flowModules} onUpdateModule={handleUpdateModule} />
        </div>
      </div>
      <FlowPreviewPanel flowModules={flowModules} />
    </DndContext>
  );
};
