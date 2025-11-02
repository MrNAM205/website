import React from 'react';
import { SOVEREIGN_MODULES } from './constants';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Search } from './components/search/Search';
import { ModuleGrid } from './components/modules/ModuleGrid';
import { CorpusPreviewModal } from './components/modals/CorpusPreviewModal';
import { SovereignModule, SavedInvocation } from './types';
import { InvocationFlowBuilder } from './components/flow-builder/InvocationFlowBuilder';
import { OmniGuidancePanel } from './components/omni-guidance/OmniGuidancePanel';
import { DocumentUploadPanel } from './components/panels/DocumentUploadPanel';
import { SemanticScanPanel } from './components/panels/SemanticScanPanel';
import { EndorsementPanel } from './components/panels/EndorsementPanel';
import { FilingPrepPanel } from './components/panels/FilingPrepPanel';
import { ExportPanel } from './components/panels/ExportPanel';
import { InvocationReplayPanel } from './components/panels/InvocationReplayPanel';
import { CorpusAuditTrail } from './components/panels/CorpusAuditTrail';
import { TrustCorpusDashboard } from './components/dashboards/TrustCorpusDashboard';
import { CreditDisputeDashboard } from './components/dashboards/CreditDisputeDashboard';
import { OmniNarrator } from './components/narrator/OmniNarrator';
import { useInvocationFlow } from './contexts/InvocationFlowContext';

const SaveFlowButton = () => {
  const {
    documentText,
    semanticFindings,
    endorsedText,
    finalManifest
  } = useInvocationFlow();

  const handleSave = () => {
    const flow = {
      id: Date.now(),
      title: "Sovereign Invocation",
      timestamp: new Date().toISOString(),
      jurisdiction: "Land",
      venue: "County Recorder",
      documentText,
      semanticFindings,
      endorsedText,
      finalManifest
    };

    const existing = JSON.parse(localStorage.getItem("invocationFlows") || "[]");
    localStorage.setItem("invocationFlows", JSON.stringify([...existing, flow]));
    alert("Invocation flow saved.");
  };

  return (
    <button onClick={handleSave} className="bg-cockpit-accent px-4 py-2 rounded mt-4">
      💾 Save Current Flow
    </button>
  );
};

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedModule, setSelectedModule] = React.useState<SovereignModule | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedInvocation, setSelectedInvocation] = React.useState<SavedInvocation | null>(null);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleOpenModal = (module: SovereignModule) => {
    setSelectedModule(module);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedModule(null);
    setIsModalOpen(false);
  };

  const handleSelectInvocation = (invocation: SavedInvocation) => {
    setSelectedInvocation(invocation);
  };

  const filteredModules = SOVEREIGN_MODULES.filter((module) => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      module.title.toLowerCase().includes(searchTermLower) ||
      module.description.toLowerCase().includes(searchTermLower) ||
      module.agentName.toLowerCase().includes(searchTermLower)
    );
  });

  return (
    <div className="min-h-screen bg-cockpit-bg text-cockpit-text-primary font-sans">
      <main className="container mx-auto px-4 py-8 md:px-6 md:py-12">
        <Header />
        <Search searchTerm={searchTerm} onSearchChange={handleSearchChange} />
        <InvocationFlowBuilder />
        <OmniGuidancePanel />
        <DocumentUploadPanel />
        <SemanticScanPanel />
        <EndorsementPanel />
        <FilingPrepPanel />
        <ExportPanel />
        <SaveFlowButton />
        <InvocationReplayPanel />
        <CorpusAuditTrail selectedInvocation={selectedInvocation} onSelectInvocation={handleSelectInvocation} />
        <OmniNarrator invocation={selectedInvocation} />
        <TrustCorpusDashboard />
        <CreditDisputeDashboard />
        <ModuleGrid modules={filteredModules} onModuleClick={handleOpenModal} />
        <Footer />
        <CorpusPreviewModal isOpen={isModalOpen} onClose={handleCloseModal} module={selectedModule} />
      </main>
    </div>
  );
};

export default App;