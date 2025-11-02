

import React, { useState, useEffect } from 'react';
import { useInvocationFlow } from '../../contexts/InvocationFlowContext';

export const FilingPrepPanel = () => {
  const { endorsedText, finalManifest, setFinalManifest } = useInvocationFlow();
  const [jurisdiction, setJurisdiction] = useState("Land");
  const [venue, setVenue] = useState("County Recorder");
  const [recipient, setRecipient] = useState("Office of Records");

  const generateFilingManifest = () => {
    if (!endorsedText) return;

    const manifest = `
--- BEGIN FILING MANIFEST ---
Jurisdiction: ${jurisdiction}
Venue: ${venue}
Recipient Entity: ${recipient}
Semantic Lineage: Preserved
Trust Corpus: Bound
---
${endorsedText}
--- END FILING MANIFEST ---
`;
    setFinalManifest(manifest);
  };

  useEffect(() => {
    // Clear final manifest if endorsed text changes
    setFinalManifest('');
  }, [endorsedText]);

  return (
    <div className="mt-8 p-6 bg-cockpit-dark text-white rounded-lg">
      <h2 className="text-xl font-bold mb-4">📬 Filing Preparation Panel</h2>

      <label className="block mb-2 text-sm font-bold">Jurisdiction:</label>
      <select
        value={jurisdiction}
        onChange={(e) => setJurisdiction(e.target.value)}
        className="mb-4 p-2 rounded bg-cockpit-panel border border-cockpit-border text-cockpit-text-primary focus:outline-none focus:ring-2 focus:ring-cockpit-accent"
      >
        <option>Land</option>
        <option>Maritime</option>
        <option>Administrative</option>
      </select>

      <label className="block mb-2 text-sm font-bold">Venue:</label>
      <input
        type="text"
        value={venue}
        onChange={(e) => setVenue(e.target.value)}
        className="mb-4 p-2 rounded bg-cockpit-panel border border-cockpit-border text-cockpit-text-primary focus:outline-none focus:ring-2 focus:ring-cockpit-accent"
      />

      <label className="block mb-2 text-sm font-bold">Recipient Entity:</label>
      <input
        type="text"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        className="mb-4 p-2 rounded bg-cockpit-panel border border-cockpit-border text-cockpit-text-primary focus:outline-none focus:ring-2 focus:ring-cockpit-accent"
      />

      <button 
        onClick={generateFilingManifest} 
        className="bg-cockpit-accent hover:bg-cockpit-accent-dark text-white font-bold py-2 px-4 rounded"
      >
        Generate Filing Manifest
      </button>

      {finalManifest && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">📜 Final Manifest Preview</h3>
          <pre className="bg-black p-4 rounded text-green-300 text-sm overflow-x-auto">
            {finalManifest}
          </pre>
        </div>
      )}
    </div>
  );
};
