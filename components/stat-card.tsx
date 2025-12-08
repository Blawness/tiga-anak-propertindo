type StatCardProps = {
  label: string;
  value: string;
};

export default function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="flex flex-col gap-2 rounded-2xl border border-brand-navy/10 bg-white p-6 shadow-[0_12px_24px_-18px_rgba(11,31,58,0.35)]">
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-gold">
        {label}
      </p>
      <p className="text-lg font-semibold text-brand-dark">{value}</p>
    </div>
  );
}

