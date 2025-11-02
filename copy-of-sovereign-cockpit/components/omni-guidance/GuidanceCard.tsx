
import React from 'react';

interface GuidanceCardProps {
  step: {
    title: string;
    summary: string;
    citation: string;
    tacticalApplication: string;
  };
}

export const GuidanceCard: React.FC<GuidanceCardProps> = ({ step }) => {
  const [showTactical, setShowTactical] = React.useState(false);

  return (
    <div className="bg-cockpit-panel border border-cockpit-border rounded-lg p-4">
      <h3 className="font-bold text-lg text-cockpit-text-primary mb-2">{step.title}</h3>
      <p className="text-cockpit-text-secondary text-sm mb-2">{step.summary}</p>
      <p className="text-xs text-cockpit-text-tertiary mb-2">Citation: {step.citation}</p>
      <button 
        onClick={() => setShowTactical(!showTactical)} 
        className="text-cockpit-accent hover:text-white text-sm mb-2"
      >
        {showTactical ? 'Hide Tactical Application' : 'Show Tactical Application'}
      </button>
      {showTactical && (
        <div className="bg-cockpit-bg p-3 rounded mt-2">
          <p className="text-sm text-cockpit-text-primary">Tactical Application: {step.tacticalApplication}</p>
        </div>
      )}
      <button 
        className="bg-blue-500 hover:bg-blue-700 text-white text-xs py-1 px-3 rounded mt-2"
        // onClick={() => addStepToManifest(step)} // Placeholder for future integration
      >
        Add to Manifest
      </button>
    </div>
  );
};
