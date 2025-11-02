

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useInvocationFlow } from '../../contexts/InvocationFlowContext';

export const DocumentUploadPanel: React.FC = () => {
  const { documentText, setDocumentText } = useInvocationFlow();
  const [documentType, setDocumentType] = useState<'coupon' | 'bill' | 'affidavit' | 'form' | 'other'>('other');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setDocumentText(e.target.result as string);
        }
      };
      reader.readAsText(file);
    });
  }, [setDocumentText]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false, // Only allow single file upload for now
  });

  return (
    <div className="mt-8 p-6 bg-cockpit-dark text-white rounded-lg">
      <h2 className="text-xl font-bold mb-4">📄 Document & Instrument Upload</h2>

      <div
        {...getRootProps()}
        className={`border-2 border-dashed p-8 text-center rounded-lg cursor-pointer transition-colors duration-300
          ${isDragActive ? 'border-cockpit-accent bg-cockpit-panel' : 'border-cockpit-border hover:border-cockpit-accent'}`}
      >
        <input {...getInputProps()} />
        {isDragActive ?
          <p>Drop the file here ...</p> :
          <p>Drag 'n' drop a file here, or click to select a file</p>
        }
      </div>

      {documentText && (
        <div className="mt-4">
          <h3 className="font-bold mb-2">Uploaded Content Preview:</h3>
          <pre className="bg-black p-4 rounded text-green-300 text-sm overflow-x-auto max-h-40">
            {documentText.substring(0, 500)}...
          </pre>
        </div>
      )}

      <div className="mt-6">
        <label htmlFor="document-type" className="block text-sm font-bold mb-2">Document Type:</label>
        <select
          id="document-type"
          value={documentType}
          onChange={(e) => setDocumentType(e.target.value as any)}
          className="w-full p-2 rounded bg-cockpit-panel border border-cockpit-border text-cockpit-text-primary focus:outline-none focus:ring-2 focus:ring-cockpit-accent"
        >
          <option value="coupon">Coupon</option>
          <option value="bill">Bill</option>
          <option value="affidavit">Affidavit</option>
          <option value="form">Form</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Placeholder for integration with SemanticScanPanel and EndorsementPanel */}
    </div>
  );
};
