export interface Repository {
  name: string;
  full_name: string;
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

export interface WorkflowRun {
  id: number;
  created_at: string;
  run_started_at: string;
  status: string;
  repository: Repository;
}

export interface WorkflowRunDetails extends WorkflowRun {
  jobs: WorkflowJob[];
}

export interface GitHubAppInstallation {
  id: number;
  account: {
    login: string;
  };
}

export interface WebhookPayload {
  action: string;
  installation: GitHubAppInstallation;
  workflow_run?: WorkflowRun;
  workflow_job?: WorkflowJob;
}