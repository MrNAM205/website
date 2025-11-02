
export interface SovereignModule {
  id: string;
  title: string;
  description: string;
  agentName: string;
  purpose?: string;
  jurisdiction?: 'Land' | 'Sea' | 'Air';
  expectedOutput?: string;
  customInput?: string; // Storing as string for JSON/YAML input
}

export interface SavedInvocation {
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
