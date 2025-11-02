
import React from 'react';
import { useInvocationFlow } from '../../contexts/InvocationFlowContext';

export const ExportPanel: React.FC = () => {
  const { finalManifest } = useInvocationFlow();

  const handleDownloadYaml = () => {
    if (!finalManifest) return;
    const blob = new Blob([finalManifest], { type: 'text/yaml;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'final_invocation_manifest.yaml';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadPdf = () => {
    alert("PDF export functionality is not yet implemented.");
    // Future: Integrate with a PDF generation library
  };

  return (
    <div className="mt-8 p-6 bg-cockpit-dark text-white rounded-lg">
      <h2 className="text-xl font-bold mb-4">📤 Export Manifest</h2>
      <p className="text-sm text-cockpit-text-secondary mb-4">Download your final invocation manifest.</p>
      <div className="flex gap-4">
        <button 
          onClick={handleDownloadYaml} 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          disabled={!finalManifest}
        >
          Download YAML
        </button>
        <button 
          onClick={handleDownloadPdf} 
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          disabled={!finalManifest}
        >
          Download PDF (Coming Soon)
        </button>
      </div>
    </div>
  );
};
