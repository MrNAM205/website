import React, { useState, useEffect } from 'react';

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

export const TrustCorpusDashboard: React.FC = () => {
  const [savedInvocations, setSavedInvocations] = useState<SavedInvocation[]>([]);

  useEffect(() => {
    const storedInvocations = localStorage.getItem('invocationFlows');
    if (storedInvocations) {
      setSavedInvocations(JSON.parse(storedInvocations));
    }
  }, []);

  return (
    <div className="mt-8 p-6 bg-cockpit-dark text-white rounded-lg">
      <h2 className="text-xl font-bold mb-4">📊 Trust Corpus Dashboard</h2>
      <p className="text-sm text-cockpit-text-secondary mb-4">Visualize all bound documents and their invocation status.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-cockpit-panel p-4 rounded">
          <h3 className="text-lg font-bold mb-2">Invocations Over Time</h3>
          <div className="flex items-center justify-center h-48 bg-cockpit-dark rounded">
            <p className="text-cockpit-text-secondary">[Chart Placeholder]</p>
          </div>
        </div>
        <div className="bg-cockpit-panel p-4 rounded">
          <h3 className="text-lg font-bold mb-2">Invocation Status</h3>
          <div className="flex items-center justify-center h-48 bg-cockpit-dark rounded">
            <p className="text-cockpit-text-secondary">[Pie Chart Placeholder]</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold mb-4">Bound Documents</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-cockpit-panel rounded">
            <thead>
              <tr className="border-b border-cockpit-accent">
                <th className="text-left p-3">Title</th>
                <th className="text-left p-3">Timestamp</th>
                <th className="text-left p-3">Jurisdiction</th>
                <th className="text-left p-3">Venue</th>
                <th className="text-left p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {savedInvocations.map((invocation) => (
                <tr key={invocation.id} className="border-b border-cockpit-dark hover:bg-cockpit-accent">
                  <td className="p-3">{invocation.title}</td>
                  <td className="p-3">{new Date(invocation.timestamp).toLocaleString()}</td>
                  <td className="p-3">{invocation.jurisdiction}</td>
                  <td className="p-3">{invocation.venue}</td>
                  <td className="p-3">
                    <span className="px-2 py-1 text-xs font-bold text-green-800 bg-green-200 rounded-full">Bound</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {savedInvocations.length === 0 && (
          <div className="flex items-center justify-center h-48 bg-cockpit-panel p-4 rounded mt-4">
            <p className="text-cockpit-text-secondary">No bound documents yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};
