import { Runner } from "@/types/runner";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ResourceMeter } from "./ResourceMeter";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface RunnerCardProps {
  runner: Runner;
}

export const RunnerCard = ({ runner }: RunnerCardProps) => {
  return (
    <Card className={cn(
      "transition-all duration-300",
      runner.status === 'active' && "border-gradient"
    )}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <h3 className="font-semibold font-mono">{runner.name}</h3>
          <p className="text-sm text-muted-foreground">{runner.repository}</p>
        </div>
        <Badge 
          variant={runner.status === 'active' ? "default" : "secondary"}
          className="font-mono"
        >
          {runner.status}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <ResourceMeter value={runner.resourceUsage.cpu} label="CPU" />
        <ResourceMeter value={runner.resourceUsage.memory} label="Memory" />
        <p className="text-xs text-muted-foreground mt-4">
          Last updated: {new Date(runner.lastUpdated).toLocaleTimeString()}
        </p>
      </CardContent>
    </Card>
  );
};