import { useQuery } from "@tanstack/react-query";
import { fetchWorkflowRuns } from "@/services/githubApi";
import { WorkflowRunDetails as WorkflowRunDetailsComponent } from "@/components/WorkflowRunDetails";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const Index = () => {
  const { toast } = useToast();

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
        <div className="space-y-8">
          {runs?.map((run) => (
            <WorkflowRunDetailsComponent key={run.id} run={run} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;