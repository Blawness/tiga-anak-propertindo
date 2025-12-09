import { FadeIn } from "./motion";

type StatCardProps = {
  label: string;
  value: string;
  primary?: boolean;
};

export default function StatCard({ label, value, primary = false }: StatCardProps) {
  const cardStyles = primary
    ? "rounded-2xl border-2 border-brand-primary/25 bg-gradient-to-br from-white via-white to-brand-lilac/40 p-6 shadow-[0_16px_32px_-16px_rgba(111,55,21,0.15)]"
    : "card-surface";

  return (
    <FadeIn className={`flex flex-col gap-2 ${cardStyles}`}>
      <p className={`text-xs font-semibold uppercase tracking-[0.15em] ${primary ? "text-brand-primary" : "text-brand-primary"}`}>
        {label}
      </p>
      <p className="text-lg font-semibold text-brand-black">{value}</p>
    </FadeIn>
  );
}

