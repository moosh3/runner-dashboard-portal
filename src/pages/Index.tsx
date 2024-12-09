import { useQuery } from "@tanstack/react-query";
import { fetchRunners } from "@/services/runnerApi";
import { RunnerCard } from "@/components/RunnerCard";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const { toast } = useToast();

  const { data: runners, isLoading, error } = useQuery({
    queryKey: ['runners'],
    queryFn: fetchRunners,
    refetchInterval: 5000, // Refresh every 5 seconds
    onError: () => {
      toast({
        title: "Error fetching runners",
        description: "Please try again later",
        variant: "destructive",
      });
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen p-8 bg-background">
        <div className="max-w-7xl mx-auto space-y-8">
          <h1 className="text-3xl font-bold">GitHub Runners Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-[200px] rounded-lg bg-card animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-background">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold">GitHub Runners Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {runners?.map((runner) => (
            <RunnerCard key={runner.id} runner={runner} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;