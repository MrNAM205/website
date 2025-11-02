import React from 'react';

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

interface OmniNarratorProps {
  invocation: SavedInvocation | null;
}

export const OmniNarrator: React.FC<OmniNarratorProps> = ({ invocation }) => {
  if (!invocation) {
    return null;
  }

  const generateSummary = (invocation: SavedInvocation): string => {
    // Placeholder for summary generation logic
    return `This Sovereign Invocation, titled "${invocation.title}", was created on ${new Date(invocation.timestamp).toLocaleDateString()}. It establishes jurisdiction in ${invocation.jurisdiction} and venue at the ${invocation.venue}. The core instrument was processed, resulting in semantic findings, endorsements, and a final manifest, all bound to the Trust Corpus.`;
  };

  return (
    <div className="mt-8 p-6 bg-cockpit-dark text-white rounded-lg">
      <h2 className="text-xl font-bold mb-4">📝 OmniNarrator Summary</h2>
      <p className="text-sm text-cockpit-text-secondary mb-4">A plain English summary of the selected invocation flow.</p>
      <div className="bg-cockpit-panel p-4 rounded">
        <p>{generateSummary(invocation)}</p>
      </div>
    </div>
  );
};
