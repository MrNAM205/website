
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
