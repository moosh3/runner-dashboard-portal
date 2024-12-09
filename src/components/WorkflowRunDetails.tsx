import type { WorkflowRunDetails as WorkflowRunDetailsType } from '@/types/github';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Clock, GitBranch, GitFork, User } from 'lucide-react';

interface Props {
  run: WorkflowRunDetailsType;
}

export const WorkflowRunDetails = ({ run }: Props) => {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <GitBranch className="w-4 h-4 mr-2 text-muted-foreground" />
            <CardTitle className="text-sm font-medium">Repository</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{run.repository.full_name}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
            <CardTitle className="text-sm font-medium">Duration</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {new Date(run.run_started_at).toLocaleTimeString()}
            </p>
            <p className="text-xs text-muted-foreground">
              Started: {new Date(run.created_at).toLocaleDateString()}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Jobs</CardTitle>
            <Badge variant={run.status === 'completed' ? 'success' : 'secondary'}>
              {run.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
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
                  <TableCell className="font-medium">{job.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2 text-muted-foreground" />
                      {job.runner_name}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1 flex-wrap">
                      {job.labels.map((label) => (
                        <Badge key={label} variant="outline" className="text-xs">
                          {label}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{new Date(job.started_at).toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={job.status === 'completed' ? 'success' : 'secondary'}
                      className="whitespace-nowrap"
                    >
                      {job.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};