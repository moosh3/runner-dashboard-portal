import type { WorkflowRunDetails as WorkflowRunDetailsType } from '@/types/github';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface Props {
  run: WorkflowRunDetailsType;
}

export const WorkflowRunDetails = ({ run }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Workflow Run Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Repository</p>
              <p>{run.repository.full_name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Status</p>
              <Badge variant={run.status === 'completed' ? 'success' : 'secondary'}>
                {run.status}
              </Badge>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Created</p>
              <p>{new Date(run.created_at).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Started</p>
              <p>{new Date(run.run_started_at).toLocaleString()}</p>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Job</TableHead>
                <TableHead>Runner</TableHead>
                <TableHead>Labels</TableHead>
                <TableHead>Started</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {run.jobs.map((job) => (
                <TableRow key={job.id}>
                  <TableCell>{job.name}</TableCell>
                  <TableCell>{job.runner_name}</TableCell>
                  <TableCell>
                    <div className="flex gap-1 flex-wrap">
                      {job.labels.map((label) => (
                        <Badge key={label} variant="outline">{label}</Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{new Date(job.started_at).toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant={job.status === 'completed' ? 'success' : 'secondary'}>
                      {job.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};