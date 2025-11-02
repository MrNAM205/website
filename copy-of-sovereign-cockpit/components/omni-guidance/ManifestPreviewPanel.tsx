
import React from 'react';
import yaml from 'js-yaml';

export const ManifestPreviewPanel = ({ steps }: { steps: any[] }) => {
  const manifest = {
    sovereign_flow: {
      name: "Omni-Guided Invocation",
      steps: steps.map((step, index) => ({
        step: index + 1,
        title: step.title,
        summary: step.summary,
        citation: step.citation || null,
        tactical_application: step.tacticalApplication || null
      })),
      lineage: {
        created_by: "Daddy",
        timestamp: new Date().toISOString()
      }
    }
  };

  const yamlOutput = yaml.dump(manifest);

  const handleExportYaml = () => {
    const blob = new Blob([yamlOutput], { type: 'text/yaml;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'omni_guided_manifest.yaml';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="mt-6 bg-cockpit-dark p-4 rounded text-white">
      <h3 className="text-lg font-bold mb-2">📜 Manifest Preview (YAML)</h3>
      <button 
        onClick={handleExportYaml} 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-sm mb-4"
      >
        Export YAML
      </button>
      <pre className="bg-black p-4 rounded overflow-x-auto text-green-300 text-sm">
        {yamlOutput}
      </pre>
    </div>
  );
};
