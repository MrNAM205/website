
import React, { createContext, useContext, useState } from 'react';

const InvocationFlowContext = createContext(null);

export const InvocationFlowProvider = ({ children }) => {
  const [documentText, setDocumentText] = useState('');
  const [semanticFindings, setSemanticFindings] = useState<string[]>([]);
  const [endorsedText, setEndorsedText] = useState('');
  const [finalManifest, setFinalManifest] = useState('');

  return (
    <InvocationFlowContext.Provider
      value={{
        documentText, setDocumentText,
        semanticFindings, setSemanticFindings,
        endorsedText, setEndorsedText,
        finalManifest, setFinalManifest
      }}
    >
      {children}
    </InvocationFlowContext.Provider>
  );
};

export const useInvocationFlow = () => useContext(InvocationFlowContext);
