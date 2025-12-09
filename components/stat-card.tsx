import { FadeIn } from "./motion";

type StatCardProps = {
  label: string;
  value: string;
};

export default function StatCard({ label, value }: StatCardProps) {
  return (
    <FadeIn className="card-surface flex flex-col gap-2">
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-primary">
        {label}
      </p>
      <p className="text-lg font-semibold text-brand-black">{value}</p>
    </FadeIn>
  );
}

