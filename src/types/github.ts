export interface WorkflowRun {
  id: number;
  created_at: string;
  run_started_at: string;
  status: string;
  repository: {
    name: string;
    full_name: string;
  };
}

export interface WorkflowJob {
  id: number;
  run_id: number;
  name: string;
  runner_name: string;
  started_at: string;
  status: string;
  labels: string[];
}

export interface WorkflowRunDetails extends WorkflowRun {
  jobs: WorkflowJob[];
}