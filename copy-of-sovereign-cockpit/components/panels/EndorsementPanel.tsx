
import React, { useState, useEffect } from 'react';
import { useInvocationFlow } from '../../contexts/InvocationFlowContext';

export const EndorsementPanel: React.FC = () => {
  const { documentText, endorsedText, setEndorsedText } = useInvocationFlow();
  const [endorsementType, setEndorsementType] = useState("Private Trust");
  const [uccProvision, setUccProvision] = useState("3-305");

  const generateEndorsement = () => {
    if (!documentText) return;

    const overlay = `
--- BEGIN ENDORSEMENT ---
Endorsement Type: ${endorsementType}
UCC Provision: ${uccProvision}
Trust Corpus: Embedded
Semantic Lineage: Preserved
---
This document is hereby endorsed under ${uccProvision} of the Uniform Commercial Code.
The undersigned declares lawful jurisdiction and authorship.
--- END ENDORSEMENT ---
`;

    setEndorsedText(`${documentText}\n\n${overlay}`);
  };

  useEffect(() => {
    // Clear endorsed text if document text changes
    setEndorsedText('');
  }, [documentText]);

  return (
    <div className="mt-8 p-6 bg-cockpit-dark text-white rounded-lg">
      <h2 className="text-xl font-bold mb-4">💸 Endorsement Panel</h2>

      <label className="block mb-2 text-sm font-bold">Endorsement Type:</label>
      <select
        value={endorsementType}
        onChange={(e) => setEndorsementType(e.target.value)}
        className="mb-4 p-2 rounded bg-cockpit-panel border border-cockpit-border text-cockpit-text-primary focus:outline-none focus:ring-2 focus:ring-cockpit-accent"
      >
        <option>Private Trust</option>
        <option>Acceptance for Value</option>
        <option>Holder in Due Course</option>
      </select>

      <label className="block mb-2 text-sm font-bold">UCC Provision:</label>
      <select
        value={uccProvision}
        onChange={(e) => setUccProvision(e.target.value)}
        className="mb-4 p-2 rounded bg-cockpit-panel border border-cockpit-border text-cockpit-text-primary focus:outline-none focus:ring-2 focus:ring-cockpit-accent"
      >
        <option value="3-302">UCC 3-302</option>
        <option value="3-305">UCC 3-305</option>
        <option value="3-401">UCC 3-401</option>
      </select>

      <button 
        onClick={generateEndorsement} 
        className="bg-cockpit-accent hover:bg-cockpit-accent-dark text-white font-bold py-2 px-4 rounded"
      >
        Generate Endorsement
      </button>

      {endorsedText && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">📜 Endorsed Document Preview</h3>
          <pre className="bg-black p-4 rounded text-green-300 text-sm overflow-x-auto">
            {endorsedText}
          </pre>
        </div>
      )}
    </div>
  );
};
