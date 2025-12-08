import { FadeIn } from "./motion";

type StatCardProps = {
  label: string;
  value: string;
};

export default function StatCard({ label, value }: StatCardProps) {
  return (
    <FadeIn className="flex flex-col gap-2 rounded-2xl border border-brand-black/8 bg-white p-6 shadow-[0_12px_24px_-18px_rgba(25,25,25,0.28)]">
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-primary">
        {label}
      </p>
      <p className="text-lg font-semibold text-brand-black">{value}</p>
    </FadeIn>
  );
}

