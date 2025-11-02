
import React from 'react';
import { SOVEREIGN_MODULES } from './constants';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Search } from './components/search/Search';
import { ModuleGrid } from './components/modules/ModuleGrid';
import { CorpusPreviewModal } from './components/modals/CorpusPreviewModal';
import { SovereignModule } from './types';
import { InvocationFlowBuilder } from './components/flow-builder/InvocationFlowBuilder';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedModule, setSelectedModule] = React.useState<SovereignModule | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

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
        <ModuleGrid modules={filteredModules} onModuleClick={handleOpenModal} />
        <Footer />
        <CorpusPreviewModal isOpen={isModalOpen} onClose={handleCloseModal} module={selectedModule} />
      </main>
    </div>
  );
};

export default App;
