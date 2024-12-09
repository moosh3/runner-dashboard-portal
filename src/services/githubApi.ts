import { WorkflowRunDetails, WebhookPayload } from '@/types/github';

const GITHUB_API_URL = 'https://api.github.com';

// This would be provided by your GitHub App
const GITHUB_APP_ID = '';
const GITHUB_PRIVATE_KEY = '';
const GITHUB_WEBHOOK_SECRET = '';

class GitHubApiService {
  private static instance: GitHubApiService;
  private workflowRuns: Map<number, WorkflowRunDetails> = new Map();

  private constructor() {}

  public static getInstance(): GitHubApiService {
    if (!this.instance) {
      this.instance = new GitHubApiService();
    }
    return this.instance;
  }

  public handleWebhook(payload: WebhookPayload) {
    if (payload.workflow_run) {
      const run = payload.workflow_run;
      if (!this.workflowRuns.has(run.id)) {
        this.workflowRuns.set(run.id, {
          ...run,
          jobs: []
        });
      }
    }

    if (payload.workflow_job) {
      const job = payload.workflow_job;
      const run = this.workflowRuns.get(job.run_id);
      if (run) {
        const updatedJobs = run.jobs.filter(j => j.id !== job.id);
        this.workflowRuns.set(job.run_id, {
          ...run,
          jobs: [...updatedJobs, job]
        });
      }
    }
  }

  public getWorkflowRuns(): WorkflowRunDetails[] {
    return Array.from(this.workflowRuns.values());
  }

  // This is a placeholder for the actual GitHub App authentication
  private async getInstallationToken(installationId: number): Promise<string> {
    // In a real implementation, you would:
    // 1. Generate a JWT signed with your GitHub App's private key
    // 2. Use that JWT to request an installation token
    // 3. Return the installation token
    console.log('Getting installation token for:', installationId);
    return 'placeholder-token';
  }
}

export const githubApiService = GitHubApiService.getInstance();

// This is the function currently used by the UI
export const fetchWorkflowRuns = async (): Promise<WorkflowRunDetails[]> => {
  return githubApiService.getWorkflowRuns();
};