
import React from 'react';
import { SovereignModule } from '../../types';
import { Modal } from '../Modal';

interface CorpusPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  module: SovereignModule | null;
}

export const CorpusPreviewModal: React.FC<CorpusPreviewModalProps> = ({ isOpen, onClose, module }) => {
  if (!module) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-2xl font-bold text-cockpit-text-primary mb-4">{module.title}</h2>
      <p className="text-cockpit-text-secondary mb-6">{module.description}</p>
      <div className="bg-cockpit-bg p-4 rounded-lg">
        <h4 className="font-mono text-sm text-cockpit-text-secondary mb-2">// MANIFEST PREVIEW</h4>
        <pre className="text-xs text-cockpit-text-primary whitespace-pre-wrap">
          {JSON.stringify(module, null, 2)}
        </pre>
      </div>
    </Modal>
  );
};
