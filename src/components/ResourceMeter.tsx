import { cn } from "@/lib/utils";

interface ResourceMeterProps {
  value: number;
  label: string;
}

export const ResourceMeter = ({ value, label }: ResourceMeterProps) => {
  const getColorClass = (value: number) => {
    if (value < 50) return "bg-emerald-500";
    if (value < 80) return "bg-amber-500";
    return "bg-red-500";
  };

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground font-mono">{label}</span>
        <span className="font-mono">{value}%</span>
      </div>
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <div
          className={cn("h-full transition-all duration-500", getColorClass(value))}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
};