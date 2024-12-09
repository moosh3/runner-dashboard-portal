import { Runner } from '@/types/runner';

// Simulated API for demo purposes
const mockRunners: Runner[] = [
  {
    id: '1',
    name: 'runner-prod-1',
    repository: 'organization/main-service',
    status: 'active',
    resourceUsage: {
      cpu: 75,
      memory: 60
    },
    lastUpdated: new Date().toISOString()
  },
  {
    id: '2',
    name: 'runner-prod-2',
    repository: 'organization/auth-service',
    status: 'idle',
    resourceUsage: {
      cpu: 5,
      memory: 30
    },
    lastUpdated: new Date().toISOString()
  }
];

export const fetchRunners = async (): Promise<Runner[]> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return mockRunners;
};