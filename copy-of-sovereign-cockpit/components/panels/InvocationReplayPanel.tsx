
import React, { useState, useEffect } from 'react';
import { useInvocationFlow } from '../../contexts/InvocationFlowContext';

interface SavedInvocation {
  id: number;
  title: string;
  timestamp: string;
  jurisdiction: string;
  venue: string;
  documentText: string;
  semanticFindings: string[];
  endorsedText: string;
  finalManifest: string;
}

export const InvocationReplayPanel: React.FC = () => {
  const { setDocumentText, setSemanticFindings, setEndorsedText, setFinalManifest } = useInvocationFlow();
  const [savedInvocations, setSavedInvocations] = useState<SavedInvocation[]>([]);

  useEffect(() => {
    // Load saved invocations from local storage
    const storedInvocations = localStorage.getItem('invocationFlows');
    if (storedInvocations) {
      setSavedInvocations(JSON.parse(storedInvocations));
    }
  }, []);

  const handleLoadInvocation = (invocation: SavedInvocation) => {
    // Reload the flow data into the context
    setDocumentText(invocation.documentText || '');
    setSemanticFindings(invocation.semanticFindings || []);
    setEndorsedText(invocation.endorsedText || '');
    setFinalManifest(invocation.finalManifest || '');
    alert(`Invocation '${invocation.title}' loaded into cockpit.`);
  };

  return (
    <div className="mt-8 p-6 bg-cockpit-dark text-white rounded-lg">
      <h2 className="text-xl font-bold mb-4">🔁 Invocation Replay</h2>
      <p className="text-sm text-cockpit-text-secondary mb-4">Load and replay previous invocation flows.</p>

      {savedInvocations.length === 0 ? (
        <p className="text-cockpit-text-secondary">No saved invocations yet.</p>
      ) : (
        <ul className="space-y-2">
          {savedInvocations.map((invocation) => (
            <li key={invocation.id} className="bg-cockpit-panel p-3 rounded flex justify-between items-center">
              <div>
                <p className="font-bold">{invocation.title}</p>
                <p className="text-xs text-cockpit-text-tertiary">{new Date(invocation.timestamp).toLocaleString()}</p>
              </div>
              <button
                onClick={() => handleLoadInvocation(invocation)}
                className="bg-green-500 hover:bg-green-700 text-white text-xs py-1 px-3 rounded"
              >
                Load
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
