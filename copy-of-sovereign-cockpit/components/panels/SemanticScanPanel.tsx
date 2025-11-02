
import React, { useState, useEffect } from 'react';
import { useInvocationFlow } from '../../contexts/InvocationFlowContext';

export const SemanticScanPanel: React.FC = () => {
  const { documentText, semanticFindings, setSemanticFindings } = useInvocationFlow();
  const [traps, setTraps] = useState<string[]>([]);
  const [rebuttals, setRebuttals] = useState<string[]>([]);

  const trapPatterns = ["person", "liable", "citizen", "resident", "subject", "individual"];

  const runSemanticScan = () => {
    if (!documentText) return;

    const foundTraps = trapPatterns.filter((term) =>
      documentText.toLowerCase().includes(term)
    );

    const generatedRebuttals = foundTraps.map((term) => {
      switch (term) {
        case "person":
          return "Rebut 'person' as a corporate fiction under statutory jurisdiction.";
        case "liable":
          return "Rebut 'liable' by asserting non-consent and lack of contract.";
        case "citizen":
          return "Rebut 'citizen' by declaring political status as a living man or woman.";
        case "resident":
          return "Rebut 'resident' as a commercial venue presumption.";
        case "subject":
          return "Rebut 'subject' by asserting sovereign capacity.";
        case "individual":
          return "Rebut 'individual' as a statutory construct lacking lawful standing.";
        default:
          return "";
      }
    });

    setTraps(foundTraps);
    setRebuttals(generatedRebuttals);
    setSemanticFindings(generatedRebuttals); // Store rebuttals in context
  };

  useEffect(() => {
    // Automatically run scan when documentText changes
    runSemanticScan();
  }, [documentText]);

  return (
    <div className="mt-8 p-6 bg-cockpit-dark text-white rounded-lg">
      <h2 className="text-xl font-bold mb-4">🧠 Semantic Scan</h2>
      <button 
        onClick={runSemanticScan} 
        className="bg-cockpit-accent hover:bg-cockpit-accent-dark text-white font-bold py-2 px-4 rounded"
      >
        Run Scan
      </button>

      {traps.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Detected Traps:</h3>
          <ul className="list-disc ml-6">
            {traps.map((trap, index) => (
              <li key={index}>{trap}</li>
            ))}
          </ul>
        </div>
      )}

      {rebuttals.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Suggested Rebuttals:</h3>
          <ul className="list-disc ml-6 text-green-300">
            {rebuttals.map((rebuttal, index) => (
              <li key={index}>{rebuttal}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
