
import React, { useState } from 'react';
import { GuidanceCard } from './GuidanceCard';
import { ModeToggle } from './ModeToggle';
import { ManifestComposer } from './ManifestComposer';
import { ManifestPreviewPanel } from './ManifestPreviewPanel';
import { CorpusBinderPanel } from './CorpusBinderPanel';

export const OmniGuidancePanel: React.FC = () => {
  const [query, setQuery] = useState('');
  const [mode, setMode] = useState<'narrative' | 'legal'>('narrative');
  const [guidanceSteps, setGuidanceSteps] = useState<any[]>([]); // Using any[] for now

  const handleGatherGuidance = async () => {
    try {
      const filename = query.toLowerCase().includes("status") ? "correct-status.json" : "default.json";
      const response = await fetch(`/reasoning-recipes/${filename}`);
      const data = await response.json();
      setGuidanceSteps(data.steps);
    } catch (error) {
      console.error("Failed to load guidance:", error);
      setGuidanceSteps([
        {
          title: "Error Loading Guidance",
          summary: "Could not retrieve guidance. Please check your query or try again.",
          citation: "N/A",
          tacticalApplication: "Ensure the reasoning recipe files are correctly placed.",
        },
      ]);
    }
  };

  return (
    <div className="p-6 bg-cockpit-dark text-white rounded-lg mt-8">
      <h2 className="text-xl font-bold mb-4">Omni Reasoning & Guidance</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter your objective (e.g., Correct my status with DMV)"
        className="w-full p-2 mb-4 rounded bg-cockpit-panel border border-cockpit-border text-cockpit-text-primary placeholder-cockpit-text-secondary focus:outline-none focus:ring-2 focus:ring-cockpit-accent transition-shadow duration-300"
      />
      <ModeToggle mode={mode} setMode={setMode} />
      <button 
        onClick={handleGatherGuidance} 
        className="bg-cockpit-accent hover:bg-cockpit-accent-dark text-white font-bold py-2 px-4 rounded mt-4"
      >
        Gather Guidance
      </button>

      <div className="mt-6 space-y-4">
        {guidanceSteps.map((step, index) => (
          <GuidanceCard key={index} step={step} />
        ))}
      </div>

      {guidanceSteps.length > 0 && <ManifestPreviewPanel steps={guidanceSteps} />}
      <CorpusBinderPanel />

      <ManifestComposer steps={guidanceSteps} />
    </div>
  );
};
