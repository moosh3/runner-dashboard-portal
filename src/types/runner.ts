export interface Runner {
  id: string;
  name: string;
  repository: string;
  status: 'active' | 'idle';
  resourceUsage: {
    cpu: number;
    memory: number;
  };
  lastUpdated: string;
}