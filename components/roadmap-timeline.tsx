"use client";

import { siteConfig } from "@/lib/site-config";
import { FadeIn, GrowY } from "@/components/motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function RoadmapTimeline() {
  return (
    <div className="relative">
      <div className="relative">
        {/* Horizontal line spanning edge-to-edge behind content without adding scroll */}
        <div className="pointer-events-none absolute inset-x-0 top-1/2 z-0 h-px w-full bg-slate-200" />

        <div className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-8 md:gap-10">
          {siteConfig.roadmap.phases.map((phase, index) => {
            const isEven = index % 2 === 0;
            return (
              <FadeIn
                key={phase.title}
                delay={0.06 * index}
                className="relative flex flex-col items-center"
              >
                {isEven && (
                  <>
                    <Card className="z-[1] mb-4 flex flex-col gap-2 border-slate-200/80 bg-white/90 px-4 py-3 text-center text-sm md:gap-3 md:text-base">
                      <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] font-semibold uppercase tracking-wide md:text-xs">
                        <Badge className="bg-brand-primary/10 text-brand-primary ring-0">
                          {phase.period}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={`border px-3 py-1 ${
                            phase.status === "Berjalan"
                              ? "border-green-200 bg-green-50 text-green-700"
                              : phase.status === "Progres"
                              ? "border-blue-200 bg-blue-50 text-blue-700"
                              : phase.status === "Terjadwal"
                              ? "border-orange-200 bg-orange-50 text-orange-700"
                              : "border-slate-200 bg-slate-50 text-slate-600"
                          }`}
                        >
                          {phase.status}
                        </Badge>
                      </div>
                      <span className="text-sm font-semibold text-slate-900 md:text-base">
                        {phase.title}
                      </span>
                      <p className="text-xs leading-relaxed text-slate-600 md:text-sm">
                        {phase.detail}
                      </p>
                    </Card>
                    <GrowY className="mb-3 h-10 w-px bg-gradient-to-b from-brand-primary/60 via-brand-primary/30 to-transparent md:h-12" />
                  </>
                )}

                {/* Marker on the line */}
                <div className="relative z-[2] flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-base font-semibold text-brand-primary shadow-sm md:h-14 md:w-14">
                  {String(index + 1).padStart(2, "0")}
                </div>

                {!isEven && (
                  <>
                    <GrowY className="mt-3 h-10 w-px bg-gradient-to-b from-brand-primary/60 via-brand-primary/30 to-transparent md:h-12" />
                    <Card className="z-[1] mt-4 flex flex-col gap-2 border-slate-200/80 bg-white/90 px-4 py-3 text-center text-sm md:gap-3 md:text-base">
                      <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] font-semibold uppercase tracking-wide md:text-xs">
                        <Badge className="bg-brand-primary/10 text-brand-primary ring-0">
                          {phase.period}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={`border px-3 py-1 ${
                            phase.status === "Berjalan"
                              ? "border-green-200 bg-green-50 text-green-700"
                              : phase.status === "Progres"
                              ? "border-blue-200 bg-blue-50 text-blue-700"
                              : phase.status === "Terjadwal"
                              ? "border-orange-200 bg-orange-50 text-orange-700"
                              : "border-slate-200 bg-slate-50 text-slate-600"
                          }`}
                        >
                          {phase.status}
                        </Badge>
                      </div>
                      <span className="text-sm font-semibold text-slate-900 md:text-base">
                        {phase.title}
                      </span>
                      <p className="text-xs leading-relaxed text-slate-600 md:text-sm">
                        {phase.detail}
                      </p>
                    </Card>
                  </>
                )}
              </FadeIn>
            );
          })}
        </div>
      </div>
    </div>
  );
}

