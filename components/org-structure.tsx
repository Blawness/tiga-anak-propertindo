import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { Reveal, RevealGroup, RevealItem, TreeConnectors } from "./motion";

const { leaders, divisions } = siteConfig.organization;

type Leader = (typeof leaders)["ceo"];
type Division = (typeof divisions)[number];

function LeaderCard({
  leader,
  id,
  parent,
  primary = false,
}: {
  leader: Leader;
  id: string;
  parent?: string;
  primary?: boolean;
}) {
  return (
    <div
      data-tree-id={id}
      data-tree-parent={parent}
      className={cn(
        "flex w-full max-w-md flex-col items-center gap-3 px-8 py-9 text-center md:px-10",
        primary ? "bg-surface text-paper" : "border border-accent bg-paper text-ink",
      )}
    >
      <span className={cn("eyebrow", primary ? "text-sand-soft" : "text-accent")}>
        {leader.title}
      </span>
      <span className="font-display text-[clamp(1.5rem,2.4vw,2rem)] leading-tight">
        {leader.name}
      </span>
    </div>
  );
}

function DivisionCard({ division, index }: { division: Division; index: number }) {
  const reportsTo = leaders[division.reportsTo as keyof typeof leaders];

  return (
    <article
      data-tree-id={`division-${index}`}
      data-tree-parent={division.reportsTo}
      className="flex h-full flex-col border border-line bg-paper"
    >
      <header className="flex flex-col gap-3 border-b border-line p-7 md:p-8">
        <p className="eyebrow flex flex-wrap items-center gap-3 text-stone">
          <span className="text-accent">Divisi {String(index + 1).padStart(2, "0")}</span>
          <span aria-hidden className="h-px w-4 bg-current" />
          <span>Melapor ke {reportsTo.title}</span>
        </p>
        <h3 className="text-h3">{division.name}</h3>
      </header>

      <ul className="flex flex-1 flex-col">
        {division.units.map((unit) => (
          <li key={unit.name} className="border-b border-line p-7 last:border-b-0 md:p-8">
            <p className="font-display text-2xl leading-tight">{unit.name}</p>
            <dl className="mt-4 flex flex-col text-sm text-ink/70">
              <div className="flex items-baseline justify-between border-t border-line py-2.5">
                <dt>Koordinator</dt>
                <dd className="tabular-nums">1</dd>
              </div>
              <div className="flex items-baseline justify-between border-t border-line py-2.5">
                <dt>Staff divisi</dt>
                <dd className="tabular-nums">{unit.staff}</dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>
    </article>
  );
}

/**
 * Company organisation chart. On desktop the reporting lines are one SVG
 * overlay with rounded elbows that draws itself on scroll; on smaller screens
 * the cards stack and each division states who it reports to.
 */
export default function OrgStructure() {
  // Operational divisions sit under Direktur Operasional (columns 1-2),
  // directly reporting divisions follow (column 3).
  const ordered = [
    ...divisions.filter((d) => d.reportsTo === "coo"),
    ...divisions.filter((d) => d.reportsTo === "ceo"),
  ];

  return (
    <TreeConnectors>
      <Reveal className="flex justify-center">
        <LeaderCard leader={leaders.ceo} id="ceo" primary />
      </Reveal>

      <div aria-hidden className="mx-auto h-10 w-px bg-accent lg:hidden" />

      <div className="grid gap-8 lg:mt-24 lg:grid-cols-3">
        <Reveal className="flex justify-center lg:col-span-2">
          <LeaderCard leader={leaders.coo} id="coo" parent="ceo" />
        </Reveal>
      </div>

      <RevealGroup className="mt-10 grid gap-8 lg:mt-24 lg:grid-cols-3" stagger={0.15}>
        {ordered.map((division) => (
          <RevealItem key={division.name} className="flex flex-col">
            <DivisionCard division={division} index={divisions.indexOf(division)} />
          </RevealItem>
        ))}
      </RevealGroup>
    </TreeConnectors>
  );
}
