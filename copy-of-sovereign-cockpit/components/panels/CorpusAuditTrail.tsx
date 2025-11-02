import React, { useState, useEffect } from 'react';
import { SavedInvocation } from '../../types';

interface CorpusAuditTrailProps {
  selectedInvocation: SavedInvocation | null;
  onSelectInvocation: (invocation: SavedInvocation) => void;
}

export const CorpusAuditTrail: React.FC<CorpusAuditTrailProps> = ({ selectedInvocation, onSelectInvocation }) => {
  const [savedInvocations, setSavedInvocations] = useState<SavedInvocation[]>([]);

  useEffect(() => {
    const storedInvocations = localStorage.getItem('invocationFlows');
    if (storedInvocations) {
      setSavedInvocations(JSON.parse(storedInvocations));
    }
  }, []);

  return (
    <div className="mt-8 p-6 bg-cockpit-dark text-white rounded-lg">
      <h2 className="text-xl font-bold mb-4">📜 Corpus Audit Trail</h2>
      <p className="text-sm text-cockpit-text-secondary mb-4">Inspect saved invocation flows.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-1">
          {savedInvocations.length === 0 ? (
            <p className="text-cockpit-text-secondary">No saved invocations yet.</p>
          ) : (
            <ul className="space-y-2">
              {savedInvocations.map((invocation) => (
                <li key={invocation.id} onClick={() => onSelectInvocation(invocation)} className={`bg-cockpit-panel p-3 rounded cursor-pointer hover:bg-cockpit-accent ${selectedInvocation?.id === invocation.id ? 'bg-cockpit-accent' : ''}`}>
                  <div>
                    <p className="font-bold">{invocation.title}</p>
                    <p className="text-xs text-cockpit-text-tertiary">{new Date(invocation.timestamp).toLocaleString()}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="md:col-span-2">
          {selectedInvocation ? (
            <div className="bg-cockpit-panel p-4 rounded">
              <h3 className="text-lg font-bold mb-2">{selectedInvocation.title}</h3>
              <p className="text-sm text-cockpit-text-secondary mb-4">{new Date(selectedInvocation.timestamp).toLocaleString()}</p>
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold">Document Text</h4>
                  <pre className="bg-cockpit-dark p-2 rounded mt-1 whitespace-pre-wrap">{selectedInvocation.documentText}</pre>
                </div>
                <div>
                  <h4 className="font-bold">Semantic Findings</h4>
                  <pre className="bg-cockpit-dark p-2 rounded mt-1 whitespace-pre-wrap">{JSON.stringify(selectedInvocation.semanticFindings, null, 2)}</pre>
                </div>
                <div>
                  <h4 className="font-bold">Endorsed Text</h4>
                  <pre className="bg-cockpit-dark p-2 rounded mt-1 whitespace-pre-wrap">{selectedInvocation.endorsedText}</pre>
                </div>
                <div>
                  <h4 className="font-bold">Final Manifest</h4>
                  <pre className="bg-cockpit-dark p-2 rounded mt-1 whitespace-pre-wrap">{selectedInvocation.finalManifest}</pre>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full bg-cockpit-panel p-4 rounded">
              <p className="text-cockpit-text-secondary">Select an invocation to view its details.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
