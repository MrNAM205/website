
import React, { useState, useEffect } from 'react';
import YAML from 'js-yaml';
import { SovereignModule } from '../../types';

interface FlowPreviewPanelProps {
  flowModules: SovereignModule[];
}

export const FlowPreviewPanel: React.FC<FlowPreviewPanelProps> = ({ flowModules }) => {
  const [manifest, setManifest] = useState<string>('');
  const [format, setFormat] = useState<'yaml' | 'json'>('yaml');

  useEffect(() => {
    const generateManifest = () => {
      const steps = flowModules.map(module => ({
        agent: module.agentName,
        ...(module.purpose && { purpose: module.purpose }),
        ...(module.jurisdiction && { jurisdiction: module.jurisdiction }),
        ...(module.expectedOutput && { expected_output: module.expectedOutput }),
        ...(module.customInput && { input: JSON.parse(module.customInput) }), // Assuming customInput is valid JSON
      }));

      const flow = {
        sovereign_flow: {
          name: "Generated Flow", // Placeholder, could be dynamic later
          steps,
          lineage: {
            created_by: "Daddy", // Placeholder
            timestamp: new Date().toISOString(),
          },
        },
      };

      if (format === 'yaml') {
        setManifest(YAML.dump(flow));
      } else {
        setManifest(JSON.stringify(flow, null, 2));
      }
    };

    generateManifest();
  }, [flowModules, format]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(manifest);
    // Optionally, add a visual feedback for copied
  };

  return (
    <div className="w-full bg-cockpit-bg p-4 rounded-lg mt-8">
      <h3 className="text-xl font-bold mb-4">Manifest Preview</h3>
      <div className="flex justify-between items-center mb-4">
        <div>
          <button 
            onClick={() => setFormat('yaml')} 
            className={`px-4 py-2 rounded-l-lg ${format === 'yaml' ? 'bg-cockpit-accent text-white' : 'bg-cockpit-panel text-cockpit-text-secondary'}`}
          >
            YAML
          </button>
          <button 
            onClick={() => setFormat('json')} 
            className={`px-4 py-2 rounded-r-lg ${format === 'json' ? 'bg-cockpit-accent text-white' : 'bg-cockpit-panel text-cockpit-text-secondary'}`}
          >
            JSON
          </button>
        </div>
        <button 
          onClick={copyToClipboard} 
          className="bg-cockpit-accent hover:bg-cockpit-accent-dark text-white font-bold py-2 px-4 rounded"
        >
          Copy to Clipboard
        </button>
      </div>
      <pre className="bg-cockpit-panel p-4 rounded-lg text-sm overflow-auto max-h-96">
        {manifest}
      </pre>
      {/* TODO: Add validation warnings */}
    </div>
  );
};
