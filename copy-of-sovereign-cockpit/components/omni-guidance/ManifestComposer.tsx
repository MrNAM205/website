
import React from 'react';

interface ManifestComposerProps {
  steps: any[]; // Placeholder for now
}

export const ManifestComposer: React.FC<ManifestComposerProps> = ({ steps }) => {
  // This component will eventually allow users to compile selected steps into a manifest or flow
  return (
    <div className="bg-cockpit-panel border border-cockpit-border rounded-lg p-4 mt-6">
      <h3 className="font-bold text-lg text-cockpit-text-primary mb-2">Manifest Composer</h3>
      <p className="text-cockpit-text-secondary text-sm">Selected steps will appear here for manifest generation.</p>
      {/* Future: Render selected steps, provide options to generate YAML/JSON */}
    </div>
  );
};
