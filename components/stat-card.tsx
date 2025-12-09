import { FadeIn } from "./motion";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { cn } from "@/lib/utils";

type StatCardProps = {
  label: string;
  value: string;
  primary?: boolean;
};

export default function StatCard({
  label,
  value,
  primary = false,
}: StatCardProps) {
  return (
    <FadeIn>
      <Card
        className={cn(
          "h-full min-w-0 border-slate-200",
          primary && "border-brand-primary/40 shadow-md",
        )}
      >
        <CardHeader className="pb-2 min-w-0">
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-primary break-words">
            {label}
          </span>
        </CardHeader>
        <CardContent className="pt-0 min-w-0">
          <CardTitle className="text-lg text-slate-900 leading-snug break-words hyphens-auto">
            {value}
          </CardTitle>
        </CardContent>
      </Card>
    </FadeIn>
  );
}

