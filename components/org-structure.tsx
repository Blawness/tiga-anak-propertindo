import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { DrawLine, Reveal, RevealGroup, RevealItem } from "./motion";

const { leaders, divisions } = siteConfig.organization;

type Leader = (typeof leaders)["ceo"];
type Division = (typeof divisions)[number];

/*
 * Desktop connector geometry. Rows use a 3-column grid with a 2rem gap, so:
 * - centre of column 3 sits (100% - 4rem) / 6 from the right edge,
 * - centre of the column 1-2 span sits (100% - 4rem) / 3 + 1rem from the left,
 * - inside that span, column centres sit (100% - 2rem) / 4 from either edge.
 */
const COL3_FROM_RIGHT = "calc((100% - 4rem) / 6)";
const SPAN12_FROM_LEFT = "calc((100% - 4rem) / 3 + 1rem)";
const SPAN_COL_INSET = "calc((100% - 2rem) / 4)";

function LeaderCard({ leader, primary = false }: { leader: Leader; primary?: boolean }) {
  return (
    <div
      className={cn(
        "relative z-[1] flex w-full max-w-md flex-col items-center gap-3 px-8 py-9 text-center md:px-10",
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
    <article className="flex h-full flex-col border border-line bg-paper">
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
 * Company organisation chart. On desktop the reporting lines are drawn as
 * hairlines that animate in; on smaller screens it stacks and each division
 * card states who it reports to.
 */
export default function OrgStructure() {
  const operational = divisions.filter((d) => d.reportsTo === "coo");
  const direct = divisions.filter((d) => d.reportsTo === "ceo");
  const ordered = [...operational, ...direct];

  return (
    <div className="flex flex-col">
      {/* Direktur Utama */}
      <Reveal className="flex justify-center">
        <LeaderCard leader={leaders.ceo} primary />
      </Reveal>

      {/* CEO stem and the bar spanning the operational branch and Human Capital */}
      <div className="hidden lg:block">
        <DrawLine axis="y" className="mx-auto h-12 w-px bg-accent" />
        <div className="relative h-px">
          <DrawLine
            axis="x"
            origin="center"
            delay={0.2}
            className="absolute top-0 h-px bg-accent"
            style={{ left: SPAN12_FROM_LEFT, right: COL3_FROM_RIGHT }}
          />
        </div>
      </div>

      {/* Mobile stem */}
      <div aria-hidden className="mx-auto h-10 w-px bg-accent lg:hidden" />

      {/* Direktur Operasional, with Human Capital's line passing on the right */}
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="flex flex-col items-center lg:col-span-2">
          <DrawLine axis="y" delay={0.35} className="hidden h-12 w-px bg-accent lg:block" />
          <Reveal className="flex w-full justify-center">
            <LeaderCard leader={leaders.coo} />
          </Reveal>
          <DrawLine axis="y" delay={0.5} className="hidden h-12 w-px bg-accent lg:block" />
          <div className="relative hidden h-px w-full lg:block">
            <DrawLine
              axis="x"
              origin="center"
              delay={0.6}
              className="absolute top-0 h-px bg-accent"
              style={{ left: SPAN_COL_INSET, right: SPAN_COL_INSET }}
            />
          </div>
        </div>
        <div className="hidden justify-center lg:flex">
          <DrawLine axis="y" delay={0.35} className="h-full w-px bg-accent" />
        </div>
      </div>

      {/* Divisions */}
      <RevealGroup className="mt-10 grid gap-8 lg:mt-0 lg:grid-cols-3" stagger={0.15}>
        {ordered.map((division, index) => (
          <RevealItem key={division.name} className="flex flex-col">
            <div aria-hidden className="hidden justify-center lg:flex">
              <span className="h-10 w-px bg-accent" />
            </div>
            <DivisionCard division={division} index={index} />
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}
