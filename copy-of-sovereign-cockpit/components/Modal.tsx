
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-cockpit-panel rounded-lg p-8 max-w-2xl w-full relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-cockpit-text-secondary hover:text-white">
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};
