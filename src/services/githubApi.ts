import { WorkflowRun, WorkflowJob, WorkflowRunDetails } from '@/types/github';

// Simulated API for demo purposes
const mockWorkflowRuns: WorkflowRunDetails[] = [
  {
    id: 1,
    created_at: new Date(Date.now() - 3600000).toISOString(),
    run_started_at: new Date(Date.now() - 3500000).toISOString(),
    status: 'completed',
    repository: {
      name: 'main-service',
      full_name: 'organization/main-service'
    },
    jobs: [
      {
        id: 1,
        run_id: 1,
        name: 'build',
        runner_name: 'GitHub Actions 1',
        started_at: new Date(Date.now() - 3400000).toISOString(),
        status: 'completed',
        labels: ['ubuntu-latest', 'self-hosted']
      }
    ]
  },
  {
    id: 2,
    created_at: new Date().toISOString(),
    run_started_at: new Date().toISOString(),
    status: 'in_progress',
    repository: {
      name: 'auth-service',
      full_name: 'organization/auth-service'
    },
    jobs: [
      {
        id: 2,
        run_id: 2,
        name: 'test',
        runner_name: 'GitHub Actions 2',
        started_at: new Date().toISOString(),
        status: 'in_progress',
        labels: ['windows-latest', 'self-hosted']
      }
    ]
  }
];

export const fetchWorkflowRuns = async (): Promise<WorkflowRunDetails[]> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return mockWorkflowRuns;
};