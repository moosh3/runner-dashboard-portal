import { useQuery } from "@tanstack/react-query";
import { fetchWorkflowRuns } from "@/services/githubApi";
import { WorkflowRunDetails as WorkflowRunDetailsComponent } from "@/components/WorkflowRunDetails";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import type { WorkflowRunDetails } from "@/types/github";

const Index = () => {
  const { toast } = useToast();
  const [selectedRun, setSelectedRun] = useState<WorkflowRunDetails | null>(null);

  const { data: runs, isLoading } = useQuery({
    queryKey: ['workflow-runs'],
    queryFn: fetchWorkflowRuns,
    refetchInterval: 5000,
    meta: {
      onError: () => {
        toast({
          title: "Error fetching workflow runs",
          description: "Please try again later",
          variant: "destructive",
        });
      },
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen p-8 bg-background">
        <div className="max-w-7xl mx-auto space-y-8">
          <h1 className="text-3xl font-bold">GitHub Workflow Runs</h1>
          <div className="space-y-4">
            {[...Array(2)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <CardTitle className="h-6 bg-muted rounded w-1/3" />
                </CardHeader>
                <CardContent>
                  <div className="h-40 bg-muted rounded" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-background">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold">GitHub Workflow Runs</h1>
        <div className="grid gap-6 md:grid-cols-2">
          {runs?.map((run) => (
            <Card 
              key={run.id} 
              className="hover:border-primary/50 transition-colors cursor-pointer"
              onClick={() => setSelectedRun(run)}
            >
              <CardHeader>
                <CardTitle className="text-lg">{run.repository.full_name}</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <dt className="text-sm font-medium text-muted-foreground">Created</dt>
                    <dd className="text-sm">{new Date(run.created_at).toLocaleString()}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm font-medium text-muted-foreground">Started</dt>
                    <dd className="text-sm">{new Date(run.run_started_at).toLocaleString()}</dd>
                  </div>
                  <div className="flex justify-between items-center">
                    <dt className="text-sm font-medium text-muted-foreground">Status</dt>
                    <dd>
                      <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        run.status === 'completed' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {run.status}
                      </div>
                    </dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Sheet open={!!selectedRun} onOpenChange={() => setSelectedRun(null)}>
        <SheetContent className="w-full sm:max-w-3xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Workflow Run Details</SheetTitle>
          </SheetHeader>
          {selectedRun && (
            <div className="mt-6">
              <WorkflowRunDetailsComponent run={selectedRun} />
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Index;